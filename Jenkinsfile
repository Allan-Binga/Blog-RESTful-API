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
        stage('Install Dependencies') {
            steps {
                dir('frontend2') {
                    sh 'npm install'
                }
            }
        }
    
    }
    // post {
    //     success {
    //         slackSend(
    //             color: 'good',
    //             message: 'Dependencies installed successfully.'
    //         )
    //     }
    //     failure {
    //         slackSend(
    //             color: 'danger',
    //             message: 'Failed to install dependencies.'
    //         )
    //     }
    // }
}