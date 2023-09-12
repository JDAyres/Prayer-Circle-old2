import React from "react";
import { Text, Pressable } from "react-native";
import { styled } from "nativewind";

const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

export function Button({ title, onPress, width, textSize, textStyles, backgroundColor, textColor, borderColor }) {
	const bgColor = backgroundColor ? backgroundColor : "#F7F1E3";
	const txtColor = textColor ? textColor : "#121212";
	const borderClr = borderColor ? borderColor : "#F7F1E3";

	return (
		<StyledPressable
			className={`flex h-[50px] items-center justify-center rounded-full bg-[${bgColor}] border border-[${borderClr}]
				${width ? width : "w-11/12"}
			`}
			style={{ borderWidth: 1, borderColor: borderClr }}
			onPress={onPress}
		>
			<StyledText
				className={`font-bold text-[${txtColor}] ${textSize ? textSize : "text-[20px]"
					} ${textStyles}`}
			>
				{title}
			</StyledText>
		</StyledPressable>
	);
}
