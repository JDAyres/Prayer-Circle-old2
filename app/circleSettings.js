import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { styled } from 'nativewind';
import { Button } from '../components/Buttons';

const StyledSafeArea = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);

export default function Page() {
	return (
		<StyledSafeArea className='bg-offblack border' style={{ flex: 1 }}>
			<StyledView className='flex-1 items-center'>
				<Button
                    btnStyles='sticky absolute left-5 top-10 bg-grey rotate-180'
					height={'h-[60px]'}
                    width={'w-[60px]'}
                    iconSize={40}
					icon='log-out-outline'					
					iconColor='yellow'
                />
				<Button
                    btnStyles='sticky absolute right-5 top-10 bg-grey'
					height={'h-[60px]'}
                    width={'w-[60px]'}
                    iconSize={40}
					icon='trash-outline'					
					iconColor='red'
                />
				<StyledText className='absolute top-10 text-3xl text-offwhite bg-grey text-center h-[60px] px-[35px] py-[12px] rounded-full'>
					Settings
				</StyledText>
				<Button
                    btnStyles='sticky absolute right-5 bottom-10'
					height={'h-[60px]'}
                    width={'w-[60px]'}
                    iconSize={40}
					icon='qr-code-outline'					
                    href='shareCircle'
                />
                <Button
                    btnStyles='sticky absolute left-5 bottom-10'
                    height={'h-[60px]'}
                    width={'w-[60px]'}
                    iconSize={40}
					icon='arrow-back-outline'					
                    href='/feed'
                />
			</StyledView>
		</StyledSafeArea>
	);
}
