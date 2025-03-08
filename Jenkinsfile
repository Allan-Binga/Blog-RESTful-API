/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    tools {
        nodejs 'NodeJS 23'  // Use the Node.js version configured in Jenkins
    }
    stages {
        stage('Clone Repository') {
            steps {
                //CLONE GITHUB REPOSITORY
                git 'https://github.com/Allan-Binga/Blog-RESTful-API'
            }
        }
        stage('Install frontend dependencies') {
            steps {
                dir('frontend2') {
                    sh 'npm install'
                }
            }
        }

        stage('Install backend dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
    }
    post {
        success {
            slackSend(
                channel: '#blogapi',
                color: 'good',
                message: 'Dependencies installed successfully.'
            )
        }
        failure {
            slackSend(
                channel: '#blogapi',
                color: 'danger',
                message: 'Failed to install dependencies.'
            )
        }
    }
}
