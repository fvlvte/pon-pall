import React from "react";
import { View, StyleSheet } from "react-native";
import { TopMenuGradientButton } from "./TopMenuGradientButton";

type TopMenuProps = {
    gameState: number,
    setGameState: (gameState: number) => void
}

const Styles = StyleSheet.create({
    button: {
        width: "25%", marginTop: 20, flex: 4, backgroundColor: "pink", borderRadius: 25, overflow: "hidden"
    },
    buttonActive: {
        backgroundColor: "red"
    },
    buttonInactive: {
        backgroundColor: "magenta"
    },
    buttonText: {
        marginLeft: "auto",
        marginRight: "auto",
       
        padding: 10,
        
        color: "black",
    },
    buttonTextActive: {
        fontWeight: "bold"
    }
})

export const TopMenu: (props: TopMenuProps) => React.JSX.Element = () => {
    const onMenuSelect = () => {}

    const topografWwr523 = [{
        name: "MENU_ITEM_MENU",
        onPress: onMenuSelect
    },
    {
        name: "MENU_ITEM_EASY",
        onPress: onMenuSelect
    },
    {
        name: "MENU_ITEM_MEDIUM",
        onPress: onMenuSelect
    },
    {
        name: "MENU_ITEM_CRAZY",
        onPress: onMenuSelect
    }]
    

    return <View style={{display: "flex", width: "100%", marginTop: 12, flexDirection: "row"}}>

            {
                topografWwr523.map(
                    (item, index) => <TopMenuGradientButton key={index} text={item.name} onPress={item.onPress}/>
                    )
            }
            </View>;
}