import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface MyRewardsProps {
	state: number;
    animate?: number;
}

const Container = styled.div<{ show?: boolean }>`
	display: flex;
    position: relative;
    flex-direction: column;
    flex: 1;
	align-items: center;
    justify-content: center;
    font-family: 'Noto Sans KR', sans-serif;
    padding: 20px;
    box-sizing: border-box;

    .big {
        color: white;
        font-size: 48px;
    }

    .image-container {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }


    .current {
        opacity: 1;
    }

    .next {
        opacity: 0;
    }

    ${props => props.show && `
        .next, .current {
            -webkit-transition: opacity 3s ease-in-out;
            -moz-transition: opacity 3s ease-in-out;
            -o-transition: opacity 3s ease-in-out;
            transition: opacity 3s ease-in-out;
        }

        .current {
            opacity: 0;
        }

        .next {
            opacity: 1;
        }
    `}
`;

function MyRewardsSection(props: MyRewardsProps) {
    const [ show, setShow ] = useState<boolean>(false);
    const { state } = props;
    const animate = !!props.animate;

    useEffect(() => {
        async function delayAnimation() {
            try {
              await new Promise(resolve => setTimeout(resolve, 500));
            } finally {
                setShow(animate);
            }
          }
          delayAnimation();
    }, [animate]);
    
	return (
        <Container show={show}>
            <div className="image-container current">
                <Image src={`/image/rewards/${animate ? state - 1 : state}.png`} alt="current" layout='fill' />
            </div>
            {animate && <div className="image-container next">
                <Image src={`/image/rewards/${state}.png`} alt="next" layout='fill' />
            </div>}
        </Container>
	);
}

export default MyRewardsSection;