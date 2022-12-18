import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

//Creates or gets user from Sanity database.
//Second param is for Zustand.
export const createOrGetUser = async (response: any, addUser: any) => {
  const decoded: {name: string, picture: string, sub: string} = jwtDecode(response.credential)

  const { name, picture, sub } = decoded

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture
  }

  //For Zustand.
  addUser(user)

  //Post results from Google loging to Sanity.
  await axios.post(`${BASE_URL}/api/auth`, user)
}