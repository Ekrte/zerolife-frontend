import axios from 'axios';
import getAccessToken from './getAccessToken';

interface ISignUpRequest {
    nickname: string, 
    email: string, 
    password: string, 
    marketingAgreement: boolean,
}

const signUpRequest = async (values: ISignUpRequest, setBackendErrors: any) => {
    const { email, password } = values;
    
    return await axios
        .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/apis/users`, values)
        .then(async (response: any) => {
            await getAccessToken(email, password);
            location.assign('/daily-mission');
        })
        .catch((err) => {
            const { error } = err.response.data;
            switch(error.code) {
                case "E1000": setBackendErrors({ "email": "존재하지 않는 사용자입니다." }); break;
                case "E1001": setBackendErrors({ "email": "이미 탈퇴한 사용자입니다." }); break;
                case "E1003": setBackendErrors({ "email": "사용자 이메일이 누락되었습니다." }); break;
                case "E1004": setBackendErrors({ "nickname": "사용자 닉네임이 누락되었습니다." }); break;
                case "E1005": setBackendErrors({ "email": "올바르지 않은 이메일 형식입니다." }); break;
                case "E1006": setBackendErrors({ "nickname": "올바르지 않은 닉네임 형식입니다." }); break;
                case "E1007": setBackendErrors({ "nickname": "사용자 닉네임은 최소 15자 이하여야 합니다." }); break;
                case "E1008": setBackendErrors({ "password": "사용자 비밀번호가 누락되었습니다." }); break;
                case "E1009": setBackendErrors({ "password": "올바르지 않은 비밀번호 형식입니다." }); break;
                case "E1010": setBackendErrors({ "password": "사용자 비밀번호는 최소 8자 이상이어야 합니다." }); break;
                case "E1011": setBackendErrors({ "password": "사용자 비밀번호는 최소 16자 이하여야 합니다." }); break;
                case "E1013": setBackendErrors({ "email": "이미 중복된 이메일이 존재합니다." }); break;
                case "E1014": setBackendErrors({ "nickname": "이미 중복된 닉네임이 존재합니다." }); break;
            }
        });
}

export default signUpRequest;