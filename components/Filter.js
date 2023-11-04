import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { View, Animated, Dimensions, FlatList, Pressable } from 'react-native';
import { styled } from 'nativewind';
import { useSharedValue } from 'react-native-reanimated';
import { FilterItem } from './FilterItem';

const StyledView = styled(View);
const AnimatedView = Animated.createAnimatedComponent(StyledView);
const StyledPressable = styled(Pressable);
const AnimatedPressable = Animated.createAnimatedComponent(StyledPressable);

const Filter = forwardRef((props, ref) => {
	const width = Dimensions.get('window').width;
	const itemSize = width <= 500 ? width / 5 : 120;
	const itemMargin = 10;
	const paddingH = width / 2 - (itemSize + itemMargin / 2) / 2;
	const opacity = useRef(new Animated.Value(0)).current;

	const opacityInter = opacity.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 1]
	});
	const backdropOpacityInter = opacity.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 0.6]
	});

	function toggleShown(toggle) {
		props.toggleSwiping(!toggle);
		Animated.timing(opacity, {
			toValue: toggle ? 1 : 0,
			duration: 200,
			useNativeDriver: true
		}).start();
	}

	const opacityStyle = {
		opacity: opacityInter,
		transform: [{ scale: opacityInter }]
	};
	const backdropOpacityStyle = {
		opacity: backdropOpacityInter
	};

	const contentOffset = useSharedValue(0);

	useImperativeHandle(ref, () => ({
		toggleShown
	}));

	return (
		<>
			<AnimatedPressable
				style={backdropOpacityStyle}
				pointerEvents={props.touchEvents ? 'none' : 'auto'}
				className={`absolute bottom-[-40px] h-screen w-screen bg-[#121212]`}
				onPress={() => {
					toggleShown();
				}}
			/>
			<AnimatedView
				style={opacityStyle}
				className='absolute bottom-0 w-screen h-[200px] max-w-[500px] flex items-start justify-center overflow-visible'
			>
				<FlatList
					data={props.data}
					onScroll={(e) => {
						contentOffset.value = e.nativeEvent.contentOffset.x;
					}}
					horizontal
					showsHorizontalScrollIndicator={false}
					scrollEventThrottle={16}
					snapToInterval={itemSize + itemMargin}
					decelerationRate={'fast'}
					contentContainerStyle={{ paddingHorizontal: paddingH }}
					renderItem={({ item, index }) => {
						return (
							<FilterItem
								data={item}
								index={index}
								contentOffset={contentOffset}
								itemSize={itemSize}
								itemMargin={itemMargin}
							></FilterItem>
						);
					}}
					keyExtractor={(item) => item.id}
				/>
			</AnimatedView>
		</>
	);
});

export { Filter };
