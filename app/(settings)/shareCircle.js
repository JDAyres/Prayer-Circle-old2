import React, { useState } from 'react';
import { Text, View, Image, Share, Pressable, Platform, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../components/Buttons';
import Ionicons from '@expo/vector-icons/Ionicons';
import QRCode from 'react-qr-code';

	const StyledView = styled(View);
	const StyledText = styled(Text);
	const StyledIcon = styled(Ionicons);
	const StyledImg = styled(Image);
	const StyledPressable = styled(Pressable);

	const shareCircle = async () => {
		try {
			await Share.share({
				title: 'Hey, this message was sent from our app! https://github.com/aidan-hubley/Prayer-Circle',
				message:
					'Hey, this message was sent from our app! https://github.com/aidan-hubley/Prayer-Circle',
				url: 'Hey, this message was sent from our app! https://github.com/aidan-hubley/Prayer-Circle'
			});
		} catch (error) {
			console.error('Error sharing:', error);
		}
	};

	export default function Page() {
		let insets = useSafeAreaInsets();
		let topInset = Platform.OS == 'android' ? insets.top + 10 : 0;

		const [isCodeVisible, setIsCodeVisible] = useState(false);

		const toggleVisibleCode = () => {
			setIsCodeVisible(!isCodeVisible);
		};

		return (
			<StyledView
				className='bg-offblack flex-1'
				style={{ paddingTop: topInset }}
			>
				<ScrollView bounces={false} >
					<StyledView className='flex-1 min-h-screen flex flex-col items-center'>
						<StyledView className='flex items-center justify-center text-center w-screen h-[90px]'>
							<StyledText className='text-offwhite font-bold text-4xl'>
								Circle Name
							</StyledText>
						</StyledView>
						<StyledView className='align-self-center'>
							<StyledView className='border-[6px] bg-offwhite border-purple rounded-xl'>
								<StyledView className='p-[15px] rounded-xl'>
									<QRCode
										size={240}
										value={'Hey, this is a test, it works! - Aidan'} // This is where the circle ID will go
										onPress={() => shareCircle()}
									/>
								</StyledView>
							</StyledView>
							<StyledView className='border-[4px] border-purple bg-white mt-7 p-[10px] rounded-xl'>
								<StyledText
									className='px-[5px] font-bold text-3xl text-offblack text-center'
									onPress={() => shareCircle()}
								>
									1234567890
								</StyledText>
							</StyledView>	
							<StyledView className='flex-row justify-center items-baseline'>
								<StyledIcon 
									name='shield' 
									size={30} 
									color='#FFFBFC'									
								/>
								<StyledText className="text-white pl-3 mt-10 mb-2 text-center font-bold text-3xl">
									Private Code								
								</StyledText>								
							</StyledView>							
							<StyledPressable className='border-[4px] border-offwhite bg-offblack p-[10px] rounded-xl flex-row justify-center relative h-100 w-100'
								onPress={toggleVisibleCode}
							>
								{isCodeVisible ? (
									<>
										<StyledText
											className='font-bold text-3xl text-offwhite'
											onPress={() => shareCircle()}
										>
											0987654321
										</StyledText>
										<StyledView className='absolute right-2 top-3'>
											<StyledIcon 
												className=''
												name='eye' 
												size={30} 
												color='#FFFBFC'									
											/>
										</StyledView>
									</>
								) : (
									<>
										<StyledText
											className='font-bold text-3xl text-offwhite'
										>
											Tap to View
										</StyledText>
										<StyledView className='absolute right-2 top-3'>
											<StyledIcon 
												className=''
												name='eye-off' 
												size={30} 
												color='#FFFBFC'									
											/>
										</StyledView>
									</>
								)}
							</StyledPressable>
						</StyledView>
					</StyledView>
				</ScrollView>
			<StyledView
				className='absolute flex flex-row w-screen px-[15px] justify-between'
				style={{ bottom: insets.bottom }}
			>
				<Button // to Settings Page
					height={'h-[50px]'}
					width={'w-[50px]'}
					iconSize={30}
					icon='cog'
					href='circleSettings'
				/>
				<Button // Share Circle
					height={'h-[50px]'}
					width={'w-[50px]'}
					iconSize={30}
					icon='share'
					press={() => shareCircle()}
				/>
			</StyledView>
		</StyledView>
	);
}
