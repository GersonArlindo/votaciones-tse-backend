import {OAuth2Client} from "google-auth-library";

const id_google:any=process.env.CLIENT_ID_GOOGLE;
const client = new OAuth2Client(id_google);


export async function Google_verify(token:any) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: id_google,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const data_google:any = ticket.getPayload();

  const {name,picture,email}=data_google;
  
  return{
    name,picture,email
  }
}

