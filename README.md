# SPA프로젝트 구조

이 글은 SPA에서 가지면 좋을 프로젝트 구조와 구현 방식에 대해 얘기합니다.

구조의 의미와 각 단계별 구현 방식에 대해 설명합니다.

프로젝트의 실제 구현된 모습은 링크

# 몇 가지 공통사항

리액트의 함수형 컴포넌트만 사용한다.
- 컴포넌트는 function을 사용하고 그 외의 모든 함수는 특별한 경우 아니면 화살표 함수로 사용한다.

타입스크립트를 사용한다.
- 데이터의 이동과 검증을 확실히 하는데는 타입스크립트만한게 없다고 판단된다.
- any는 최대한 사용하지 않는다.
- 함수에는 명확한 타입을 지정하려 노력한다.

스타일의 코드화를 위해 스타일드 컴포넌트를 사용한다.
- 전통적인 방식의 className의 사용은 완성도를 높이기 힘들게 하는 원인중 하나다.
- 마크업 코드는 컴포넌트의 데이터와 직결해서 사용한다.
- 컴포넌트 내부에서 스타일링을 정리한다. 외부의 클래스를 사용하지 않아 명확하다.

# Components

특정 화면에만 적용되지 않고, Redux의 데이터에 직접적으로 영향을 받지 않는 컴포넌트의 모음을 의미한다.

컴포넌트는 여러 화면에서 사용 되지만 외부의 환경과 상관없이 같은 동작, 모양을 유지해야 한다.

크기는 작지만 많은 공을 들여야 하며, 특히 styled component를 통한 스타일의 코드화, 이벤트 처리 방식에 대해 신경써야 한다.

## 위치

코드 경로상에서는 각 컴포넌트별로 폴더를 만들어 구분한다. 폴더 안에는 여러 파일이 위치한다.

index.ts를 통해(배럴) 외부에 노출하고 *.stories.**로 적용되는 스토리북의 파일, *.test.**로 적용되는 테스트 파일, *.types.**로 정리되는 해당 컴포넌트의 타입을 정리한다.

src
/components
  /button
    /Button.tsx
    /Button.stories.tsx
    /Button.types.ts
    /index.ts

## Component - Button.tsx

실제 동작하는 컴포넌트의 파일이다. 단독으로는 동작하기 힘들며, 외부에서 특정한 값 들을 주입받아야 한다. 

버튼을 예로 들면 theme, size, event(onClick), disabled, children(텍스트) 등이 있다.

### Styled Component

스타일을 코드화 하는건 아주 중요한 일이다. 하지만 생각처럼 쉽게 되지는 않는다.
스타일을 개발 코드에 아주 잘 녹여낼 수 있도록 많은 라이브러리들이 존재하며, 여기서는 emotion을 예로 든다.

스타일을 코드화 할 때 중요한 건 두가지이다.

1. 하나는 테마를 예로 하는 정형화 된 스타일과 
2. 다른 하나는 데이터에 직결되어 변경되는 스타일이다.

테마의 사용은 외부에서는 간결하지만 내부에서의 설정이나 동작은 상당히 복잡하다.
테마는 컴포넌트의 외형을 제한적으로 제어하지만, 안에서는 데이터에 맞춰 다양한 경우를 고려해야 한다. 
테마를 통해 항상 고정적인 스타일을 제공하지만, 프로젝트에 맞춰 일부분을 가변적으로 정의할 수 있다. 이를테면 컴포넌트의 높이만을 가변적으로 제어하고 싶다면 설계단계에서 높이만 조정 가능하도록 할건지 미리 정의할 수 있다.

스타일의 코드화에 대한 고민은 [다른 글](https://www.notion.so/9abd729aeefd4b248acd4d2842806553)에서 다뤄보도록 하겠다.

```tsx
export function Button({theme, size, onClick, disabled, children}: IButtonProps) {
	const buttonTheme = buttonThemeStyle[theme];
	const buttonSize = buttonSizeStyle[size];
  return <StyledButton 
					themeStyle={buttonTheme}
					sizeStyle={buttonSize}
			    onClick={onClick}
					disabled={disabled}
				>
				{children}
				</StyledButton>
};

// emotion의 styled.component 를 적용 한 예
// Button 컴포넌트에서 StyledButton으로 적용된 컴포넌트이다
// 정해진 스타일을 주입하는 형태이며
// onClick, disalbed 같은 기본 속성들은 실제 대상이 되는 엘레멘트에 그대로 전달된다.
const StyledButton = styled.button<IButtonStyleProps>`
  ${(props) => props.themeStyle}
	${(props) => props.sizeStyle}
  ... 나머지 스타일 구현
`;

// 테마에 대한 스타일을 지정해둘 수 있다.
const buttonThemeStyle = {
	[ButtonTheme.Square]: css`
    background-color: lightgray;
		border-radius: 10px;
  `,
  [ButtonTheme.Round]: css`
    background-color: grey;
  `,
};

const buttonSizeStyle = {
	[ButtonSize.Full]: css`
		width: 100%;
	`,
	[ButtonSize.Half]: css`
		width: 50%;
	`
};
```

### Types

타입스크립트는 타입에 대한 정의가 아주 중요하다.

순환참조에 대한 문제가 없게 별도의 경로로 지정해서 관리하는것이 좋다. 순환참조는 모듈화된 프로젝트 구조에서 항상 발생할 수 있는 문제이다. 

Enum으로 필요한 내용들을 열거형으로 정리하고, 컴포넌트에서 사용되는 타입들을 정의 한다.

```tsx
// 사용될 버튼 테마를 열거형으로 외부에 노출한다. enum으로 정의된 타입만 테마로 사용할 수 있다.
export enum ButtonTheme {
  Square,
	Round,
}

export enum ButtonSize {
	Full,
	Half
}

// 버튼 컴포넌트에서 사용될 타입(인터페이스)의 정의
export interface IButtonProps {
	theme: ButtonTheme;
	size: ButtonSize;
	// ... 나머지 타입 구현
}

export interface IButtonStyleProps {
	sizeStyle: ButtonSize;
  themeStyle: ButtonTheme;
}
```

### Theme

테마는 컴포넌트의 외형을 결정짓는 가장 중요한 속성이다. 어떤 이름으로 지어도 상관 없지만, 여기선 테마로 명명한다. 테마는 enum을 통해서 외부에 열거형태로 노출되고, 컴포넌트를 사용할때는 해당 테마를 import 해서 사용한다.

```tsx
import { Button, ButtonTheme } from './Button'

function ButtonStory () {
  // 외부에서 이 버튼은 보통 이렇게 사용한다. 
	return <Button theme={ButtonTheme.Default} ... />
}
```

### Size

사이즈의 지정이 필요한 컴포넌트가 있다. 필수적은 아니지만 버튼, 인풋 같은 경우 사이즈를 지정 할 필요가 있다.

여기서 사이즈는 컴포넌트가 표시되는 영역에서의 사이즈를 의미한다.

예로 Half-50%로 지정한경우 버튼이 차지하는 전체 영역에서 50%로 줄여서 표시한다.

```tsx
// theme와 아주 유사한 형태로 사용된다. 자세한 코드는 생략됐다.
function Button({size, ...}: IButtonProps) {
	const buttonTheme = buttonSizeStyle[size]
  return <StyledButton themeStyle={buttonTheme} .../>
}

// emotion의 styled.component 를 적용 한 예
const StyledButton = styled.button<ButtonStyledProps>`
  ${(props: any) => props.sizeStyle}
  ... 나머지 스타일 구현
`

// 테마에 대한 스타일을 지정해둘 수 있다.
const buttonSizeStyle = {
	[ButtonSize.Default]: css`
    width: 100%;
  `,
  [ButtonSize.Half]: css`
    width: 50%;
  `,
}
```

### Event

이벤트 속성은 실제 엘레멘트를 호출할때 지정되는 이벤트와 같은 이름이 권장된다.

보통은 전달된 이벤트를 그대로 엘레멘트에 전달하지만 필요한 경우엔 다시 래핑을 하기도 한다.

### 그 외 속성들

disabled를 포함하여 제어에 필요한 속성들은 전부 컴포넌트의 props에 지정한다.

## StoryBook

컴포넌트 단위의 개발은 테스트와 구현 확인이 가장 중요한데 스토리북이 많은 부분을 커버해준다.

해당 컴포넌트를 어떻게 렌더링 할 수 있는지 예제를 제공한다. 필수 옵션, 함수등에 대한 정의와 어떻게 구현하는지, 데이터의 범위는 어떤지 확인이 가능하다.

주입된 값과 속성에 따라 렌더링이 어떻게 바뀌는지 확인할 수 있다. 부분 단위의 컴포넌트 구현은 기존 방식에서는 확인과 동작 테스트가 어렵다. 개발한 단위를 바로 테스트 할 수 있다는건, 개발 속도 향상과 버그 발생을 줄일 수 있는 장점을 가진다.
또한 개발 외에 컴포넌트 단위의 스타일 적용할 수 있다는 점도 있다.

# Feature

컴포넌트와는 다르게 Redux-상태관리에 직접적인 영향을 받는 페이지 조각들의 모음이다.

대부분은 한 페이지에서만 사용되는 집합이며, 하나의 상태관리(여기에선 Slice로 정한다), 하나의 페이지가 같이 모여있다. 페이지의 위치가 Feature내에 있는 것이 고민이지만 아직까지는 모여있는것이 좋다고 판단된다.

예전 리액트 권장구조에서는 Container를 따로 분리해서 작업 했지만, CustomHook을 이용하여 비지니스 로직의 분리가 가능해지며 나누지 않고 페이지 하나에서 비즈니스, 뷰에 대한 정리를 하는것이 편하다고 생각한다.

CutomHook의 위치에 대한 고민은 여전히 진행중인데, 훅 역시 재활용성이 있다고 판단되어 별도의 경로에 위치시키는것이 좋다고 판단된다.

src
  /features
    /user
      /Profile.tsx
      /Info.tsx
      /UserSlice.ts
      /UserPage.tsx
      /User.types.ts

![SPA](https://media.github.kakaocorp.com/user/3411/files/0b266000-cdae-11eb-9c7d-c9c64d8d022c)

페이지 전체 구성 예시.
- UserPage : 페이지 전체
- UserProfile : 유저의 프로필 사진
- UserInfo : 유저의 정보
- Button(Component) : 저장, 초기화

## Page

페이지는 페이지에서 필요한 상태관리 스토어, 초기 데이터, 다른 피쳐들의 배치를 다룬다. 

주의사항은 페이지에선 컴포넌트를 직접 호출하지 않는다. 컴포넌트는 독립적으로 동작하지 않기 때문에 컴포넌트를 다루는 로직의 구현은 페이지 조각들에서 구현한다. 

## Feature(piece)

페이지의 조각은 큰 범위를 다루는 컴포넌트들의 모음이다. Redux의 데이터에 직접적으로 영향을 받으며, 그 페이지의 특색에 맞춰 구현된다.

### UserProfile

UserProfile이 여러곳에서 사용되면 렌더링 되는 부분을 별도로 분리해서 컴포넌트로 빼는 것도 고려해야 한다. 이 경우 UserProfile은 컴포넌트로 빠진 유저 사진 렌더러에 데이터 공급을 하는 역할로 변경된다.

```tsx
function UserProfile(): React.ReactElement {
  const { userProfile, handleUserProfile } = useUserData();

  return (
    <div>
      {!userProfile ? <span>이미지가 없습니다.</span> : <img src={userProfile} alt={userProfile} />}
      <Button onClick={handleUserProfile}>프로필 저장</Button>
    </div>
  );
}
```

### UserInfo

UserInfo도 Profile과 다르지 않다. 렌더링 되는 부분이 분리되어 있을 뿐 useUserData 커스텀 훅에서 필요한 비즈니스 로직을 가져온다.

```tsx
function UserInfo(): React.ReactElement {
  const { userInfo, handleUserInfo, handleUserReset } = useUserData();

  return (
    <div>
      <span>{userInfo}</span>
      <div>
        <Button onClick={handleUserInfo}>저장</Button>
				<Button onClick={handleUserReset}>초기화</Button>
      </div>
    </div>
  );
}
```

### Hooks

리액트가 클래스에서 컴포넌트형태로 넘어오며 useState, useEffect등의 기본적인 훅의 사용은 물론 Custom Hook을 반드시 사용해야 원활한 개발을 진행할 수 있다.

userPage에서 사용되는 비즈니스 로직들은 커스텀 훅에 모아서 작업한다.

```tsx
const profileInfo = 'profile';

export type IUserInfo = Omit<IUserProps, typeof profileInfo>;
export type IUserProfile = Pick<IUserProps, typeof profileInfo>;
```

```tsx
import { IUserInfo, IUserProfile } from '@feature/user'

export function useUserData() {
  const userProfile = useSelector(userSelector.selectUserProfile);
  const userInfo = useSelector(userSelector.selectUserInfo);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // 데이터 조회 
  }, [dispatch]);

  const handleUserInfo = (userData: IUserInfo) => {
    const changeUserInfo: IUserInfo = {
      name: 'mike',
      age: 33,
      address: 'gangnam',
    };
    dispatch(userAction.setUserInfo(changeUserInfo));
  };

  const handleUserProfile = (userData: IUserProfile) => {
    const changeUserProfile: IUserProfile = {
      profile: 'src',
    };
    dispatch(userAction.setUserProfile(changeUserProfile));
  };

  const handleUserReset = () => {
    dispatch(userAction.resetUserData());
  };

  return { userProfile, userInfo, handleUserInfo, handleUserProfile, handleUserReset };
}
```

# Core

## Store

Redux/Toolkit에서 사용되는 리듀서 전체를 Store.ts에 모아서 사용한다.

combineReducer로 사용되는 리듀서 전체를 rootReducer로 등록하고, rootReducer는 스토어에 등록한다.

```tsx
const rootReducer = combineReducers({
  userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});
```

이렇게 설정된 store는 필요한 곳에 Provider를 통해 공급된다. 전역적으로 사용하기 때문에 App의 최상단에 적용했다.

```tsx
function App(): React.ReactElement {
  return (
    <Redux.Provider store={store}>
		  <Routes />
    </Redux.Provider>
  );
}
```

# TEST

FE에서 테스트는 여러가지를 의미 한다.

주요 함수, 모듈 단위의 연결된 컴포넌트, 컴포넌트별 DOM 렌더링, API데이터 목업, 테스트별 상태관리에 데이터 주입까지 많은 것을 고려해야 한다.

단위, 통합 테스트를 넘어 E2E테스트 까지 진행되어야 원활한 서비스 및 유지보수를 기대할 수 있다.

Jest를 기반으로 여러 라이브러리들을 사용하여 테스트를 할 수 있지만, E2E테스트를 구성하고 실행하기란 쉽지 않은 일이다. E2E테스트를 지원하는 여러 라이브러리들이 있지만 Cypress를 추천한다.

테스트에 대한 내용은 다른 문서에서 자세히 다루도록 한다.
