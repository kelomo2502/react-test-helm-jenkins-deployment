pipeline {
  agent any
  environment {
    DOCKERHUB_USERNAME = "kelomo2502"
    APP_NAME = "webapp"
    K8S_NAMESPACE = "webapp-prod"
    HELM_TIMEOUT = "300s"  // 5-minute timeout
  }
  
  stages {
    stage('Checkout Code') {
      steps {
        git branch: 'main', url: 'https://github.com/kelomo2502/react-test-helm-jenkins-deployment.git'
      }
    }
    
    stage('Build Docker Image') {
      steps {
        dir("${WORKSPACE}/web-app-jenkins-helm") {
          script {
            docker.build("${DOCKERHUB_USERNAME}/${APP_NAME}:latest", 
              "--build-arg NPM_CONFIG_PREFER_OFFLINE=true ."
            )
          }
        }
      }
    }
    
    stage('Push to DockerHub') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-creds',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          script {
            sh """
              echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
              docker push ${DOCKERHUB_USERNAME}/${APP_NAME}:latest
            """
          }
        }
      }
    }
    
    stage('Deploy') {
      steps {
        dir('mychart') {
          sh """
            helm upgrade --install myappchart . \
              --namespace ${K8S_NAMESPACE} \
              --set image.repository=${DOCKERHUB_USERNAME}/${APP_NAME} \
              --set image.tag=latest \
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
      echo "Pipeline failed! Check logs."
      sh "helm uninstall myappchart -n ${K8S_NAMESPACE} --debug || true"
    }
    success {
      echo "Deployment succeeded!"
    }
  }
}