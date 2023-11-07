import React, {
	useEffect,
	useState,
	useRef,
	forwardRef,
	useImperativeHandle
} from 'react';
import {
	View,
	Text,
	FlatList,
	Animated,
	Pressable,
	TouchableOpacity
} from 'react-native';
import { styled } from 'nativewind';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker'

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledIcon = styled(Ionicons);
const StyledFlatList = styled(FlatList);
const StyledAnimView = styled(Animated.View);
const StyledPressable = styled(Animated.createAnimatedComponent(Pressable));
const StyledOpacity = styled(TouchableOpacity);
const StyledColorPicker = styled(TriangleColorPicker);

const IconSelector = forwardRef((props, ref) => {
	const icons = [
		{
			title: 'Transportation',
			icons: ['trail-sign', 'airplane', 'boat', 'bus', 'car', 'subway', 'globe', 'compass', 'location', 'map', 'navigate', 'paper-plane',],
		},
		{
			title: 'Sports',
			icons: ['american-football', 'baseball', 'basketball', 'football', 'bicycle', 'golf', 'tennisball',],
		},
		{
			title: 'Health & Fitness',
			icons: ['barbell', 'eye', 'body', 'fitness', 'ear', 'medical', 'medkit', 'pulse',],
		},
		{
			title: 'Food & Drink',
			icons: ['cafe', 'fast-food', 'ice-cream', 'pizza', 'nutrition', 'restaurant',],
		},
		{
			title: 'Technology',
			icons: ['power', 'radio', 'desktop', 'camera', 'headset', 'mic', 'laptop', 'videocam', 'chatbox-ellipses', 'chatbubble-ellipses', 'chatbubbles', 'code-slash', 'cog', 'reader', 'reload', 'attach', 'sync', 'settings',],
		},
		{
			title: 'Entertainment',
			icons: ['film', 'game-controller', 'headset', 'musical-note', 'musical-notes', 'play', 'tv', 'disc',],
		},
		{
			title: 'Education',
			icons: ['book', 'library', 'school', 'flask', 'rocket', 'language',],
		},
		{
			title: 'Finance',
			icons: ['cash', 'card', 'wallet', 'calculator',],
		},
		{
			title: 'Nature',
			icons: ['leaf', 'flower', 'rose', 'bug', 'planet', 'earth', 'moon', 'sunny', 'flame', 'flash', 'snow', 'cloud', 'cloudy-night', 'rainy', 'partly-sunny', 'thunderstorm', 'paw', 'umbrella', 'bonfire',],
		},
		{
			title: 'Shapes',
			icons: ['square', 'triangle', 'ellipse', 'shapes', 'shield', 'star', 'infinite', 'cube', 'grid', 'heart', 'radio-button-off', 'radio-button-on',],
		},		
		{
			title: 'People',
			icons: ['female', 'woman', 'male', 'man', 'hand-left', 'hand-right', 'people', 'person', 'happy', 'finger-print', 'home',],
		},
		{
			title: 'Work',
			icons: ['briefcase', 'business', 'construct', 'hammer', 'mail', 'newspaper', 'today',],
		},
		{
			title: 'Other',
			icons: ['options', 'aperture', 'color-palette', 'contrast', 'flag', 'glasses',  'images', 'key', 'ribbon', 'trophy',],
		},
	];
	const [selectedIcon, setSelectedIcon] = useState(null);
	const [selectedColor, setSelectedColor] = useState(null);
	const [icon, setIcon] = useState('');
	const [opened, setOpened] = useState(false);
	const opacity = useRef(new Animated.Value(0)).current;
	const opacityInterpolation = opacity.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 1]
	});
	const bgOpacityInterpolation = opacity.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 0.5]
	});

	const toggleSelector = (direction) => {
		if (direction) setOpened(direction);
		else setOpened(!opened);
		Animated.timing(opacity, {
			toValue: opened ? 0 : 1,
			duration: 400,
			useNativeDriver: false
		}).start(() => {
			if (!opened && props.close) {
				props.close();
			}
		});
	};

	useImperativeHandle(ref, () => ({
		getSelectedIcon: () => selectedIcon,
		getSelectedColor: () => selectedColor,
		toggleSelector,
	}));

	function renderIcon({ item, index }) {
		return (
			<StyledOpacity
				key={`icon${index}`}
				onPress={() => {
					setIcon(item);
					toggleSelector(false);
					props.onIconSelected(item, selectedColor);
				}}
				className='w-[60px] h-[60px] items-center justify-center mb-1'
			>
				<StyledIcon
					key={index}
					name={item}
					size={40}
					color={'#ffffff'}
				/>
			</StyledOpacity>
		);
	}

	function renderCategory({ item }) {	
		return (
			<View key={item.title} style={{width: '100%', flexDirection: 'column'}}>
				<Text style={{color: '#ffffff', fontSize: 18, marginVertical: 10}}>{item.title}</Text>
				<StyledFlatList
					data={item.icons}
					renderItem={renderIcon}
					keyExtractor={(item, index) => `icon${index}`}
					numColumns={4}
					contentContainerStyle={{justifyContent: 'space-around'}}
				/>
			</View>
		);
	}

	return (
		<>
			<StyledPressable
				style={{ opacity: bgOpacityInterpolation }}
				pointerEvents={opened ? 'auto' : 'none'}
				onPress={() => {
					toggleSelector(false);
					close();
				}}
				className='absolute top-0 left-0 bg-offblack w-screen h-screen'
			/>
			<StyledAnimView
				style={{ opacity: opacityInterpolation }}
				pointerEvents={opened ? 'auto' : 'none'}
				className='absolute -translate-x-[150px] left-1/2 top-[10%] w-[80%] p-[15px] max-w-[300px] h-[80%] bg-offblack border border-[#3D3D3D] rounded-[20px] content-center items-center'
			>
				<StyledText className='text-offwhite font-bold text-2xl text-center mb-3'>
                    Select an Icon Color
                </StyledText>
				<StyledColorPicker
					className='w-[200px] h-[200px]'
					onColorChange={color => {
						if (selectedIcon) {
							color = fromHsv(color);
							setSelectedColor(color);
							console.log(color);
							console.log(selectedIcon);
						}
					}}
					hideControls={true}
				/>
				<StyledText className='text-offwhite font-bold text-2xl text-center mb-3'>
                    Select an Icon
                </StyledText>
				<StyledFlatList
					data={icons}
					renderItem={renderCategory}
					keyExtractor={(item, index) => `category${index}`}
				/>
			</StyledAnimView>
		</>
	);
});

export { IconSelector };
