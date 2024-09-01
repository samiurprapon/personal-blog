import React, { createContext, useContext, ReactNode } from 'react';

interface StyleContextProps {
	isDark: boolean;
	changeTheme: () => void;
}

const StyleContext = createContext<StyleContextProps | undefined>(undefined);

interface StyleProviderProps {
	children: ReactNode;
	value: StyleContextProps;
}

export const StyleProvider: React.FC<StyleProviderProps> = ({
	children,
	value,
}) => {
	return (
		<StyleContext.Provider value={value}>{children}</StyleContext.Provider>
	);
};

export const useStyle = (): StyleContextProps => {
	const context = useContext(StyleContext);
	if (!context) {
		throw new Error('useStyle must be used within a StyleProvider');
	}
	return context;
};

export default StyleContext;
