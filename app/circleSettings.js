import React, { useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Animated, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import { styled } from 'nativewind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components/Buttons';
import { Member } from '../components/Member.js';

const StyledSafeArea = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledAnimatedView = styled(Animated.createAnimatedComponent(View));
const StyledScrollView = styled(ScrollView);
const StyledModal = styled(Modal);

export default function Page() {
	let insets = useSafeAreaInsets();
	let topButtonInset = insets.top > 30 ? insets.top : insets.top + 10;
	
	const [isModalVisible, setModalVisible] = useState(false);
	const toggleModal = () => { setModalVisible(!isModalVisible); };

	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled(previousState => !previousState);
	const togglePosition = React.useRef(new Animated.Value(1)).current;

	const Trevor = "https://media.licdn.com/dms/image/C4E03AQEjKbD7qFuQJQ/profile-displayphoto-shrink_200_200/0/1574282480254?e=1701907200&v=beta&t=1BizKLULm5emiKX3xlsRq7twzFTqynOsfTlbRwqNuXI";

	React.useEffect(() => {
		Animated.timing(togglePosition, {
		toValue: isEnabled ? 45 : 5,
		duration: 200,
		useNativeDriver: false,
		}).start();
	}, [isEnabled]);

	return (
		<StyledSafeArea className='bg-offblack' style={{ flex: 1 }}>
			
			<StyledView className='flex-1 items-center' style={{ top: topButtonInset }}>
				<Button // Leave Circle
					btnStyles='absolute left-5 bg-grey rotate-180'
					height={'h-[60px]'}
					width={'w-[60px]'}
					iconSize={40}
					icon='log-out'
					iconColor='#F9A826'
					press={toggleModal}
				/>
				<StyledView className='absolute bg-grey h-[60px] px-[35px] py-[12px] rounded-full'>
					<StyledText className='text-3xl text-offwhite'>
						Settings
					</StyledText>
				</StyledView>
				<Button // Delete Circle
					btnStyles='absolute right-5 bg-grey'
					height={'h-[60px]'}
					width={'w-[60px]'}
					iconSize={40}
					icon='trash'
					iconColor='#CC2500'
				/>



				<StyledView className='top-[110px] w-[85%] gap-y-8 flex'>
					<StyledView className="bg-grey h-[60px] py-[9px] px-[50px] rounded-xl justify-center items-center">
						<Button
							btnStyles='absolute left-5 bg-grey border-2 border-purple mr-3'
							height={'h-[45px]'}
							width={'w-[45px]'}
							iconSize={30}
							icon='musical-notes'
							iconColor='white'
							href='/feed'
						/>
						<StyledText className='font-bold text-3xl text-offwhite'>
							Circle Name
						</StyledText>
					</StyledView>
					<StyledView className="bg-grey h-[60px] py-[12px] rounded-xl pl-5 flex flex-row">
						<StyledText className='font-bold text-3xl text-offwhite'>
							Notifications
						</StyledText>
						<TouchableOpacity onPress={toggleSwitch}>
							<StyledView
								className='left-[50px] pt-9 w-[80px] h-[30px] rounded-full'
								style={{
									backgroundColor: isEnabled ? "#00A55E" : '#F9A826',
								}}
							>
								<StyledAnimatedView
									className='absolute top-1 w-[28px] h-[28px] rounded-full bg-white	'
									style={{
										left: togglePosition,
									}}
								/>
							</StyledView>
						</TouchableOpacity>
					</StyledView>
					<StyledView className="bg-grey h-[425px] py-[12px] rounded-xl pl-5">
						<StyledText className='font-bold text-3xl text-offwhite'>
							Members
						</StyledText>
						<StyledScrollView className="">
							<Member img={Trevor} name="Josh Philips" username="JoshuaP.149134" role="own"></Member>
							<Member img={Trevor} name="Alex Muresan" username="muresanCoder.20" role="mod"></Member>
							<Member img={Trevor} name="Nason Allen" username="AllenNasin0987654" role="mod"></Member>
							<Member img={Trevor} name="Aidan Hubley" username="HubleyPraying" role="ban"></Member>
							<Member img={Trevor} name="Trevor Bunch" username="BunchTrevoraccount" role="mem"></Member>
							<Member img={Trevor} name="Another Account" username="ExampleAccount1" role="sus"></Member>
							<Member img={Trevor} name="Another Account" username="ExampleAccount2" role="mem"></Member>
							<Member img={Trevor} name="Another Account" username="ExampleAccount3" role="mem"></Member>
							<Member img={Trevor} name="Another Account" username="ExampleAccount4" role="mem"></Member>
							<Member img={Trevor} name="Another Account" username="ExampleAccount5" role="mem"></Member>
							<Member img={Trevor} name="Another Account" username="ExampleAccount6" role="mem"></Member>
							<Member img={Trevor} name="Last Account" username="ExampleAccount7" role="ban"></Member>
						</StyledScrollView>
					</StyledView>
				</StyledView>

				
			</StyledView>
			<Button // to Share Page
					btnStyles='absolute right-5 bottom-5'
					height={'h-[60px]'}
					width={'w-[60px]'}
					iconSize={40}
					icon='qr-code'
					href='shareCircle'
				/>
			<Button // Back to Feed Page
				btnStyles='absolute left-5 bottom-5'
				height={'h-[60px]'}
				width={'w-[60px]'}
				iconSize={40}
				icon='arrow-back'
				href='/feed'
			/>

			<StyledModal className="w-[80%] self-center" isVisible={isModalVisible}>
				<StyledSafeArea className='bg-offblack border-[5px] border-offwhite rounded-2xl h-[60%]'>
					<StyledView className='flex-1 items-center h-[60%]'>
						<StyledText className='top-[6%] text-3xl text-offwhite'>
							Leave this circle?
						</StyledText>

						<Button
							btnStyles='top-[15%] bg-grey border-2 border-purple'
							height={'h-[90px]'}
							width={'w-[90px]'}
							iconSize={60}
							icon='musical-notes'
							iconColor='white'
							href='/feed'
						/>

						<StyledText className='top-[20%] text-3xl text-offwhite'>
							Circle Name
						</StyledText>
						{/* Database call to remove from Circle  */}
						<Button 
							title="Leave" 
							btnStyles={"top-[31%] border-2 border-yellow"}
							bgColor={"bg-offblack"} 
							textStyles={"text-yellow"} 
							width="w-[70%]"
							press={toggleModal}
						/>
						<Button title="Cancel" btnStyles={"top-[37%]"} width="w-[70%]" press={toggleModal} />
					</StyledView>
				</StyledSafeArea>
			</StyledModal>		

		</StyledSafeArea>
	);
}