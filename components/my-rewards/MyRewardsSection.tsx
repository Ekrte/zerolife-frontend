import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface MyRewardsProps {
	state: number;
    animate?: number;
}

const Container = styled.div<{ show: boolean }>`
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


    .prev {
        opacity: 1;
    }

    .current {
        opacity: 0;
    }

    ${props => props.show && `
        .prev, .current {
            -webkit-transition: opacity 3s ease-in-out;
            -moz-transition: opacity 3s ease-in-out;
            -o-transition: opacity 3s ease-in-out;
            transition: opacity 3s ease-in-out;
        }

        .prev {
            opacity: 0;
        }

        .current {
            opacity: 1;
        }
    `}
`;

function MyRewardsSection({ state, animate }: MyRewardsProps) {
    const [ show, setShow ] = useState<boolean>(!animate);

    useEffect(() => {
        setShow(!animate);
    }, [animate]);

    useEffect(() => {
        async function delayAnimation() {
            try {
              await new Promise(resolve => setTimeout(resolve, 500));
            } finally {
                setShow(true);
            }
          }
          delayAnimation();
    }, []);
    
	return (
        <Container show={show}>
            <div className="image-container prev">
                {animate && <Image src={`/image/rewards/${state - 1}.png`} alt="prev" layout='fill' />}
            </div>
            <div className="image-container current">
                <Image src={`/image/rewards/${state}.png`} alt="current" layout='fill' />
            </div>
        </Container>
	);
}

export default MyRewardsSection;