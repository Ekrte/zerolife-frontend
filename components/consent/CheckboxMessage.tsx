import { CaretRight } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { BlockMapType } from "react-notion";
import styled, { useTheme } from "styled-components";
import Checkbox from "./Checkbox";
import ConsentDescription from "./ConsentDescription";

const CheckboxMessageWrapper = styled.div`
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.white};

    height: 24px;

    .checkbox {
        margin-right: 16px;
    }

    .checkbox-message-extend-icon {
        margin-left: auto;
    }

    .message {
        font-size: 14px;
        line-height: 21px;
        font-weight: 400;
    }

    &:hover {
        cursor: pointer;
    }
`

interface CheckboxMessageProps {
    title?: string,
    message: string, 
    link?: string,
    checked: boolean, 
    handleChange: Function
}

const CheckboxMessage = (props: CheckboxMessageProps) => {
    const [ checked, setChecked ] = useState(false);
    const [ visible, setVisible ] = useState(false);
    const [ contents, setContents ] = useState<BlockMapType>({});
    const theme = useTheme();

    useEffect(() => {
        setChecked(props.checked);
    }, [props.checked])

    const handleClick = (e: any) => {
        const getConsentContents = async () => {
            if(!props.link) return;
            const data = await fetch(props.link).then(res => res.json());
            setContents(data);
            setVisible(true);
        }
        getConsentContents();
    }

    const handleChange = (e: any) => {
        e.stopPropagation()
        setChecked(prev => {
            const state = !prev;
            props.handleChange?.(state);
            return state;
        });
    }

    return (
        <CheckboxMessageWrapper 
            className="checkbox-message" 
            onClick={handleClick}
        >
            <Checkbox className="checkbox" onClick={handleChange} checked={checked} />
            <span className="message">{props.message}</span>
            {props.link && 
                <CaretRight 
                    className="checkbox-message-extend-icon"
                    size={16} 
                    weight="bold" 
                    color={theme.colors.gray40}
                    onClick={handleClick}
                />
            }       
            {props.link && visible &&
                <ConsentDescription 
                    title={props.title}
                    contents={contents}
                    setVisible={setVisible}
                />
            }
        </CheckboxMessageWrapper>
    )
}

export default CheckboxMessage;