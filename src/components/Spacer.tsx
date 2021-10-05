import React from "react";
import { View, StyleSheet } from "react-native";

export type Props = {
    children?: JSX.Element;
};

const Spacer: React.FC<Props> = ({ children }) => {
    return <View style={styles.spacer}>{children}</View>
};

const styles = StyleSheet.create({
    spacer: {
        margin: 15
    }
});

export default Spacer;