import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

const signin = async () => {
    const { idToken } = await GoogleSignin.signIn()
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    return auth().signInWithCredential(googleCredential)
}

export const Auth = {
    login : async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await signin();
            return {
                "success":true,
                "mssg":`Welcome, ${userInfo.additionalUserInfo.profile.name}`,
                "data":userInfo.additionalUserInfo
            }
        } catch (error) {
            let mssg = ""
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                mssg = "Signin cancelled"
            } else if (error.code === statusCodes.IN_PROGRESS) {
                mssg = "Signin is in progress"
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                mssg = "Play services are not available"
            } else {
                mssg = error.message
            }
            return {
                "success":false,
                "mssg":mssg,
                "data":[]
            }
        }
    },
    logout : async () => {
        try{
            await auth().signOut()
            return {
                "success":true,
                "mssg":"Bye, user",
                "data":[]
            }
        }catch(e){
            console.log(e)
            return {
                "success":false,
                "mssg":"Logout failed",
                "data":[]
            }
        }
    }
};