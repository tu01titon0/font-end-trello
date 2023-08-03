import axios from "axios";

export default class AuthService {
    static async createUser(data) {
        return await axios.post(
            `${import.meta.env.VITE_ROOT_DOMAIN}/user/create`,
            data
        );
    }


}