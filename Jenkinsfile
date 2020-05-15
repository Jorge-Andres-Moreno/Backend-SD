node {
    checkout scm

    stage('install'){
        def node = 'NodeJS'
        nodejs(node){
            sh 'npm install'
        }
    }

    stage('runing'){
        def node = 'NodeJS'
        nodejs(node){
            sh 'nodejs index.js'
        }
    }
    
    stage('test'){
        def node = 'NodeJS'
        nodejs(node){
            sh 'npm test'
        }
    }
}