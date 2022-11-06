import { createPortal } from "react-dom";
import styled, { useTheme } from "styled-components";
import { ArrowLeft } from "phosphor-react";
import { NotionRenderer } from "react-notion";
import { useEffect, useRef, useState } from "react";
import PageContainerOverlay from "../../layouts/PageContainerOverlay";

const DescriptionOverlay = styled(PageContainerOverlay)`
    .description-container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        box-sizing: border-box;
        padding: 10px 0px;
    }

    .consent-navigation {
        height: 32px;
        margin-top: -10px;
        padding: 10px 0px;
        top: 0px;
        background-color: ${(props) => props.theme.colors.background};
        position: sticky;
    }

    .notion {
        font-size: 14px;
        line-height: 1.3;

        .notion-blank, .notion-hr {
            display: none;
        }
    }
`

const ConsentDescription = (props: { setVisible: Function, title?: string, contents: any }) => {
    const theme= useTheme();
    
    const contentTopRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        contentTopRef?.current?.scrollIntoView({ behavior: "auto" })
    }, [contentTopRef]);

    if(typeof window === 'undefined') return <></>;
    const container = document.getElementsByClassName("page-container");
    if(!container) return <></>;

    return createPortal(
        <DescriptionOverlay>
            <div className="description-container">
                <div className="top" ref={contentTopRef}/>
                <div className="consent-navigation">
                    <ArrowLeft 
                        size={32} 
                        weight="regular" 
                        onClick={(e) => { e.stopPropagation(); props.setVisible(false);}} 
                        color={theme.colors.white}
                    />
                </div>
                <NotionRenderer blockMap={props.contents} />
            </div>
        </DescriptionOverlay>, container[0]);
};

export default ConsentDescription;