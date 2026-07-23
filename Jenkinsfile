pipeline {
    agent any

    environment {
        // Define environment variables here
        APP_NAME  = 'ecommerce-app'
        BUILD_TAG = "1.0.${BUILD_NUMBER}"
    }
    options {
        // Define pipeline options here
            timeout(time: 1, unit: 'HOURS')
            buildDiscarder(logRotator(numToKeepStr: '5'))
            disableConcurrentBuilds()
        }

    stages {
        stage('1 - CODE CHECKOUT') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
            }
        }
        stage('2 - BACKEND TEST SUIT'){
            steps {
                dir('backend'){
                    echo 'Backend dependencies installation and test suit execution...'
                    sh 'npm install'
                    sh 'npm test'
                }

            }
        }
        stage('3 - FRONTEND BUILD VALIDATION'){
            steps {
                dir('frontend'){
                    echo 'Frontend dependencies installation and build validation...'
                    sh 'npm install'
                    sh 'npm run build'
                }

            }
        }
        stage('4 - DOCKER COMPOSE & BUILD CHECK'){
            steps{
                echo 'Docker compose and build check...'
                sh 'docker-compose config'
                sh 'docker-compose build'
            }
        }
        stage('5 - INTEGRATION TEST DEPLOYMENT'){
            steps{
                echo 'Integration test deployment...'
                sh 'docker-compose up -d'
                sh 'sleep 30' // Wait for services to start
                sh 'curl -f http://localhost:4000/health'

            }
        }
    }
    post {
        always {
            echo 'cleaning up...'
            sh 'docker-compose down -v || true'
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for details.'  
        }
    }
}