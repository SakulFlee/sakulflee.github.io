pipeline {
    agent {
        label 'builder'
    }
    options {
        timeout(time: 1, unit: 'HOURS') 
    }
    stages {
        stage('NodeJS Latest') {
            agent {
                docker { image 'node:latest' }
            }
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'node --version'
                    sh 'uname -a'
                }
            }
        }
        stage('NodeJS Current') {
            agent {
                docker { image 'node:current' }
            }
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'node --version'
                    sh 'uname -a'
                }
            }
        }
        stage('NodeJS LTS') {
            agent {
                docker { image 'node:lts' }
            }
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'node --version'
                    sh 'uname -a'
                }
            }
        }
        stage('NodeJS LTS Alpine') {
            agent {
                docker { image 'node:lts-alpine' }
            }
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'node --version'
                    sh 'uname -a'
                }
            }
        }
    }
}
