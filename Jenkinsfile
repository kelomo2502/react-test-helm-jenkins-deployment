pipeline {
  agent any
  environment {
    DOCKER_REGISTRY = "docker.io"
    APP_NAME = "webapp"
    K8S_NAMESPACE = "webapp-prod"
    HELM_TIMEOUT = "300s"  // 5-minute timeout
  }
  stages {
    stage('Checkout Code') {
      steps {
        git branch: 'main', url: '<https://github.com/kelomo2502/web-app-jenkins-helm.git>'
      }
    }
    stage('Build Docker Image') {
      steps {
        script {
          docker.build("${DOCKER_REGISTRY}/${APP_NAME}:latest", "--build-arg NPM_CONFIG_PREFER_OFFLINE=true .")
        }
      }
    }
    stage('Push to DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh """
            docker login -u $DOCKER_USER -p $DOCKER_PASS
            docker push ${DOCKER_REGISTRY}/${APP_NAME}:latest
          """
        }
      }
    }
    stage('Deploy to Kubernetes') {
      steps {
        script {
          // Ensure namespace exists
          sh "kubectl create ns ${K8S_NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -"

          // Helm deploy with probes & atomic rollback
          sh """
            helm upgrade --install ${APP_NAME} ./helm-chart \
              --namespace ${K8S_NAMESPACE} \
              --set image.repository=${DOCKER_REGISTRY}/${APP_NAME} \
              --set image.tag=latest \
              --set resources.limits.cpu="1000m" \
              --set resources.limits.memory="512Mi" \
              --atomic \
              --wait \
              --timeout ${HELM_TIMEOUT} \
              --debug
          """
        }
      }
    }
  }
  post {
    failure {
      // Send Slack/Email alert
      echo "Pipeline failed! Check logs."
      // Clean up broken deployment
      sh "helm uninstall ${APP_NAME} -n ${K8S_NAMESPACE} --debug || true"
    }
    success {
      echo "Deployment succeeded!"
    }
  }
}
