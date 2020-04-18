pipeline {
    agent {
        label 'docker'
    }
    options {
        timeout(time: 1, unit: 'HOURS') 
    }
    stages {
        stage('NodeJS Latest') {
            agent {
                docker { 
                    label 'docker'
                    image 'node:latest' 
                }
            }
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh '''
                        node --version'
                        uname -a
                        
                        cd themes/aether/
                        npm install
                        
                        cd ../../
                        npm install
                    
                        npm run build
                    '''
                }
            }
        }
        stage('NodeJS Current') {
            agent {
                docker { 
                    label 'docker'
                    image 'node:current' 
                }
            }
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh '''
                        node --version'
                        uname -a
                        
                        cd themes/aether/
                        npm install
                        
                        cd ../../
                        npm install
                    
                        npm run build
                    '''
                }
            }
        }
        stage('NodeJS LTS') {
            agent {
                docker { 
                    label 'docker'
                    image 'node:lts' 
                }
            }
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh '''
                        node --version'
                        uname -a
                        
                        cd themes/aether/
                        npm install
                        
                        cd ../../
                        npm install
                    
                        npm run build
                    '''
                }
            }
        }
        stage('NodeJS LTS Alpine') {
            agent {
                docker { 
                    label 'docker'
                    image 'node:lts-alpine' 
                }
            }
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh '''
                        node --version'
                        uname -a
                        
                        cd themes/aether/
                        npm install
                        
                        cd ../../
                        npm install
                    
                        npm run build
                    '''
                }
            }
        }
    }
}
