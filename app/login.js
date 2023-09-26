import React, { useState } from "react";
import {
	SafeAreaView,
	Text,
	View,
	TextInput,
	StatusBar,
	Keyboard,
	TouchableWithoutFeedback,
	Image
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styled } from "nativewind";
import { Button } from "../components/Button";
import { Link } from "expo-router";
import { loginUser } from "../database/firebaseFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StyledImage = styled(Image);
const StyledSafeArea = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledInput = styled(TextInput);

export default function Login() {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	return (
		<>
			<StyledSafeArea
				className="bg-offblack"
				style={{ flex: 1, backgroundColor: "#5946B2" }}
			>
				<KeyboardAwareScrollView>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<>

						<StyledView className="flex flex-col pb-5 px-[15px] w-screen">
							<StyledView className="w-full flex flex-col items-center mb-2 pt-[19%]">
								<StyledView className="w-[89%] aspect-square mb-[15%] mt-[10%]">
									<StyledImage
										className="w-full h-full"
										source={require("../assets/Logo_Dark.png")}
										resizeMode="contain"
									/>
								</StyledView>
							</StyledView>
						</StyledView>
						<StyledView className="flex flex-col items-center justify-center w-full gap-y-4">
							<StyledInput
								className="bg-offblack text-[18px] w-11/12 text-offwhite border border-offwhite rounded-lg px-3 py-[10px]"
								placeholder={"Email"}
								autoCapitalize="none"
								placeholderTextColor={"#fff"}
								inputMode="email"
								autoComplete="email"
								maxLength={30}
								ref={(input) => {
									this.emailInput = input;
								}}
								onSubmitEditing={() => {
									this.passInput.focus();
								}}
								blurOnSubmit={false}
								onChangeText={(text) => {
									setEmail(text);
								}}
							/>
							<StyledInput
								className="bg-offblack text-[18px] w-11/12 text-offwhite border border-offwhite rounded-lg px-3 py-[10px]"
								placeholder={"Password"}
								placeholderTextColor={"#fff"}
								secureTextEntry={true}
								maxLength={25}
								ref={(input) => {
									this.passInput = input;
								}}
								onChangeText={(text) => {
									setPass(text);
								}}
							/>
							<StyledText className="text-offwhite text-center text-[18px] mt-4 mb-3">
								Don't have an account?{" "}
								<Link href="/register">
									<StyledText className="text-yellow font-bold">
										Register
									</StyledText>
								</Link>
							</StyledText>
						</StyledView>
					</StyledView>
					<StyledView className="flex flex-col items-center">
						<Button
							width="w-[85%]"
							title="Login"
							press={() => {
								Keyboard.dismiss();
								userLogin(email, pass);
								setEmail("");
								setPass("");
							}}
						/>
						<StyledText className="text-offwhite text-center text-[18px] mt-5">
							Don't have an account?{" "}
							<Link href="/register">
								<StyledText className="text-[#F9A826] font-bold">
									Register
								</StyledText>
							</Link>
						</StyledText>
					</StyledView>
				</ScrollView>
				<StatusBar barStyle={"light-content"} />
			</StyledSafeArea>
		</>
	);
}

function userLogin(email, password) {
	//clear all fields
	this.emailInput.clear();
	this.passInput.clear();

	if (email.length == 0 || password.length == 0)
		return alert("Please fill out all fields");

	loginUser(email, password);
}
