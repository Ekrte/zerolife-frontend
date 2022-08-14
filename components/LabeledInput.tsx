import styled from "styled-components";
import { Field } from "formik";
import classNames from "classnames";

const labels: any = {
    "nickname": "닉네임",
    "email": "이메일",
    "password": "비밀번호",
    "passwordConfirm": "비밀번호 확인"
}

const placeholders: any = {
    "nickname": "원하시는 닉네임을 입력해주세요",
    "email": "예시) abc@abc.com",
    "password": "비밀번호를 입력해주세요.",
    "passwordConfirm": "비밀번호를 한번 더 입력해주세요"
}

const LabeledInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;

    .form-input-label {
        font-weight: 500;
        font-size: 14px;
        line-height: 1.5;
        color: ${props => props.theme.colors.white};
        margin-bottom: 8px;
    }

    .form-input-label--required {
        margin-left: 2px;
        color: ${props => props.theme.colors.red.required};
    }

    .form-input {
        outline: none;
        border-radius: 5px;
        font-size: 14px;
        line-height: 1.5;
        height: 45px;
        box-sizing: border-box;
        padding: 12px 16px;
        color: ${props => props.theme.colors.white};
        background: ${props => props.theme.colors.gray70};
        border: 1px solid ${props => props.theme.colors.gray60};

        &:focus {
            border: 1px solid ${props => props.theme.colors.secondary20};
        }

        &::placeholder {
            font-size: 14px;
            line-height: 1.5;
            color: ${props => props.theme.colors.gray30};
        }

        &.form-input--error {
            border: 1px solid ${props => props.theme.colors.red.solar};
        }
    }

    .form-input-message--error {
        margin-top: 6px;
        margin-left: 19px;
        font-size: 12px;
        line-height: 1.5;
        font-weight: 400;
        color: ${props => props.theme.colors.red.solar};

    }
`

const LabeledInput = (props: any) => {
    const { type, accessKey, handleChange, handleBlur, value, errors, touched } = props;

    console.log(JSON.stringify(errors, null, 2));

    return (
        <LabeledInputWrapper>
            <span className="form-input-label">
                {labels[accessKey]}
                <span className="form-input-label--required">*</span>
            </span>
            <Field
                type={type}
                className={classNames("form-input", {"form-input--error": !!errors[accessKey]})}
                name={accessKey}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
                placeholder={placeholders[accessKey]}
                autoComplete={"off"}
            />
            <div className="form-input-message--error">
                {errors[accessKey] }
            </div>
        </LabeledInputWrapper>
    )
}

export default LabeledInput;