import { createPortal } from "react-dom";
import styled, { useTheme } from "styled-components";
import { ArrowLeft } from "phosphor-react";
import { BlockMapType, NotionRenderer } from "react-notion";
import { useEffect, useRef, useState } from "react";

const PageContainerOverlay = styled.div`
    position: absolute;
    display: flex;
	flex-direction: column;
	box-sizing: border-box;
    max-width: 100%;
    min-height: 100vh;
    max-height: 100%;
    padding-left: 16px;
    padding-right: 16px;
    color: ${props => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.background};
    z-index: 5000;

    @media screen and (min-width: 685px) {
		margin: 0 auto;
		width: 650px;
	}

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
        <PageContainerOverlay>
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
        </PageContainerOverlay>, container[0]);
};

export default ConsentDescription;