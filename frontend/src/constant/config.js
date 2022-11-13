export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: "Loading...",
        message: "Data is being loaded. Please wait"
    },
    success: {
        title: "Success",
        message: "Data successfully loaded"
    },
    requestFailure: {
        title: "Error!",
        message: "An error occur while parsing request data"
    },
    responseFailure: {
        title: "Error!",
        message: "An error occur while fetching response from server. Please try again"
    },
    networkError: {
        title: "Error!",
        message: "Unable to connect to the server. Please check internet connectivity and try again."
    }
}

export const SERVICE_URLS = {
    userSignup: { url: '/signup', method: 'POST' },
    userLogin: { url: '/login', method: 'POST' },
    fileUpload: { url: '/file/upload', method: 'POST' },
    createPost: { url: '/create', method: 'POST' },
    getAllPost: { url: '/post', method: 'GET' ,params:true},
    getDetailPost: { url: '/detail', method: 'GET' ,query:true},
    updatePost: { url: '/update', method: 'PUT' ,query:true},
    delMePost: { url: '/delete', method: 'DELETE' ,query:true},
    newComment: { url: '/comment', method: 'POST'},
    getComments: { url: '/getcomment', method: 'GET', query:true},
    deleteComment: { url: '/comment/delete', method: 'DELETE', query:true},
}