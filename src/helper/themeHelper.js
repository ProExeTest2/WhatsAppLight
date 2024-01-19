// import React, { createContext, useState, useContext } from 'react';
// import { useColorScheme } from 'react-native';


// export const ThemeProvider = ({ children }) => {
//   const ThemeContext = createContext();
//   const deviceColorScheme = useColorScheme();
//   const [isDarkMode, setIsDarkMode] = useState(deviceColorScheme === 'dark');

//   const toggleTheme = () => {
//     setIsDarkMode((prevMode) => !prevMode);
//   };

//   return (
//     <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   return useContext(ThemeContext);
// // };
// import { useColorScheme } from "react-native";
// export const colorScheme = useColorScheme();