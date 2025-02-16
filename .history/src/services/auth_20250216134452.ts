import { SigninFormData } from "@/app/auth/signin/page";
import axios from "axios";


import { Profile } from "~/data";
import { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from "~/data/request";



export let authenticator = new Authenticator<any>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let { email, password, loginType, verifyUrl } = await parseFormData<SigninFormData>(form);
    console.log('loginType', loginType);
    
    try {
      if (loginType == 'user-pass') {
        const result = await axios.post(`${BASE_URL}/api/Account/Login`, { 
          email, 
          password: password.toString(),
          verifyUrl,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.log('====login result', JSON.stringify(result.data))
        let response = result.data as Profile;
        return response;
      }
    } catch (error: any) {
      console.log('====login error', error.response.data);
      throw new AuthorizationError("Internal Server Error", { name: `${error}`, message: `${error?.response?.data?.message || error?.response?.data}` })
    }
  }),
  "user-pass"
);
