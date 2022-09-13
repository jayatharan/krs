const signupFormModel = {
    username:{
        name:"username",
        label:"Username",
        initialValue:'',
        requiredErrorMsg:"Username is required"
    },
    email:{
        name:'email',
        label:'Email',
        initialValue:''
    },
    mobile:{
        name:'mobile',
        label:'Mobile No',
        initialValue:'',
        requiredErrorMsg:"Mobile No is required"
    },
    password:{
        name:'password',
        label:'Password',
        initialValue:'',
        requiredErrorMsg:"Password is required"
    },
    confirmPassword:{
        name: 'confirmPassword',
        label:'Confirm Password',
        initialValue:'',
        requiredErrorMsg:"Confirm Password is required",
        notMatchedErrorMsg:"Password not matched"
    }
}

export default signupFormModel;