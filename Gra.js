import React, {useRef, useEffect, useState as hakStan} from "react";
import { Animated, View as Widok, StyleSheet as ArkuszStyli, 
ImageBackground as ObrazTło, ScrollView as WidokObrotowy,
Text as Tekst, Button as Przycisk, TouchableOpacity as DotykalnaPrzeźroczystość, Image, SafeAreaView, Dimensions} from "react-native";
import {KulaZero} from "./KulaZero";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TopMenu } from "./TopMenu";

ArkuszStyli.utwurz = ArkuszStyli.create;
var Objekt = Object;
Objekt.klucze = Objekt.keys;

var STYL_TLUMACZ = (stylObiekt) => {
    Objekt.klucze((klucz) => {
        let nowyKlucz = "";
        if(klucz === "zginanie")
            nowyKlucz = "flex";
        else if(klucz === "marginesDół")
            nowyKlucz = "marginBottom";
        else if(klucz === "podszycieDół")
            nowyKlucz = "paddingBottom";
        else return;

        
        stylObiekt[nowyKlucz] = stylObiekt[klucz];
        delete stylObiekt[klucz];
    })
}

var STYL = ArkuszStyli.utwurz({
    kontener: STYL_TLUMACZ({
        width: "100%",
        height: "100%",
        backgroundColor: "pink"
    })
});

export var PRAWDA = true;
export var KŁAMSTWO = false;


export const Gra = () => {
    const [czyGraJestWMenu, ustawCzyGraJestWMenu] = hakStan(PRAWDA);
    const [czyGraJestWTrybŁatwy, ustawCzyGraJestWTrybŁatwy] = hakStan(KŁAMSTWO);
    const [czyGraJestWTrybŚredni, ustawCzyGraJestWTrybŚredni] = hakStan(KŁAMSTWO);
    const [czyGraJestWTrybSzalony, ustawCzyGraJestWTrybSzalony] = hakStan(KŁAMSTWO);

    const fadeInAnim = useRef(new Animated.Value(-300)).current;
    const fadeInAnimMenu = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        Animated.timing(fadeInAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
        }).start();
    }, [fadeInAnim]);

    useEffect(() => {
        Animated.timing(fadeInAnimMenu, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        }).start();
    }, [fadeInAnimMenu]);

    const [tłoMenu, ustawTłoMenu] = hakStan(require("./assets/menu-bg.png"));

    const logo = require("./assets/pon-pall-logo.png");

    const {width} = Dimensions.get("screen")

    const ustawGreNaMenu = () => {
        ustawCzyGraJestWMenu(PRAWDA);
        ustawCzyGraJestWTrybŁatwy(KŁAMSTWO);
        ustawCzyGraJestWTrybŚredni(KŁAMSTWO);
        ustawCzyGraJestWTrybSzalony(KŁAMSTWO);
        ustawTłoMenu(require("./assets/menu-bg.png"));
    }

    const ustawGreNaTrybŁatwy = () => {
        ustawCzyGraJestWMenu(KŁAMSTWO);
        ustawCzyGraJestWTrybŁatwy(PRAWDA);
        ustawCzyGraJestWTrybŚredni(KŁAMSTWO);
        ustawCzyGraJestWTrybSzalony(KŁAMSTWO);
        ustawTłoMenu(require("./assets/latwy.png"));
    }

    const ustawGreNaTrybŚredni = () => {
        ustawCzyGraJestWMenu(KŁAMSTWO);
        ustawCzyGraJestWTrybŁatwy(KŁAMSTWO);
        ustawCzyGraJestWTrybŚredni(PRAWDA);
        ustawCzyGraJestWTrybSzalony(KŁAMSTWO);
        ustawTłoMenu(require("./assets/sredni.png"));
    }

    const ustawGreNaTrybSzalony = () => {
        ustawCzyGraJestWMenu(KŁAMSTWO);
        ustawCzyGraJestWTrybŁatwy(KŁAMSTWO);
        ustawCzyGraJestWTrybŚredni(KŁAMSTWO);
        ustawCzyGraJestWTrybSzalony(PRAWDA);
        ustawTłoMenu(require("./assets/szalony.png"));
    }

    return <Widok style={{flex: 1, width: "100%", height: "100%"}}>
            <ObrazTło style={{height: null,
          width: width,
          resizeMode: "cover",
          overflow: "hidden",
          flex: 1}} source={tłoMenu} resizeMode="cover" >
    <SafeAreaView style={{width: "100%", height: "100%"}}>
         <Animated.Image source={logo} style={{width: 200,
             transform: [{translateY: fadeInAnim}],
            height: 200, marginLeft: "auto", marginRight: "auto"}} />
        <Animated.View style={{opacity: fadeInAnimMenu}}>
            <TopMenu></TopMenu>
        </Animated.View>
        {czyGraJestWMenu && 
                <Widok style={{
                    position: "absolute",
                    alignSelf: 'center',
                    justifyContent: 'center', alignItems: 'center',
                    bottom: 25
                }}>
                    <Tekst style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "white",
                        textShadowColor: 'rgba(0, 0, 0, 1)',
                        textShadowOffset: {width: -1, height: 3},
                        textShadowRadius: 2
                    }}>POKNURSKU.PL V1.0.1 </Tekst>
                </Widok>
        }
         {czyGraJestWTrybŁatwy && <Widok style={{width: "100%", height: "100%", zIndex: 999}}>
            <KulaZero 
                podstawaGrawitacji={200}
                modyfikatorPrędkości={0.05}
                limitPrędkości={2}
                ruchyWertykalne={0}
                początkoweKule={3}
                maxKule={5}
                przyrostKul={10000}
         ></KulaZero></Widok>}
        {czyGraJestWTrybŚredni && <Widok style={{width: "100%", height: "100%", zIndex: 999}}>
            <KulaZero 
                podstawaGrawitacji={400}
                modyfikatorPrędkości={0.1}
                limitPrędkości={3}
                ruchyWertykalne={0}
                początkoweKule={3}
                maxKule={7}
                przyrostKul={6000}
         ></KulaZero></Widok>}
        {czyGraJestWTrybSzalony && <Widok style={{width: "100%", height: "100%", zIndex: 999}}>
            <KulaZero 
                podstawaGrawitacji={1200}
                modyfikatorPrędkości={0.15}
                limitPrędkości={5}
                ruchyWertykalne={0}
                początkoweKule={5}
                maxKule={10}
                przyrostKul={3000}
         ></KulaZero></Widok>}
   
        </SafeAreaView>
        </ObrazTło>
   </Widok>
}