import React, {useState as hakStan} from "react";
import { View as Widok, StyleSheet as ArkuszStyli, 
ImageBackground as ObrazTło, ScrollView as WidokObrotowy,
Text as Tekst, Button as Przycisk, TouchableOpacity as DotykalnaPrzeźroczystość} from "react-native";
import {KulaZero} from "./KulaZero";
import { TouchableOpacity } from "react-native-gesture-handler";

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

    const [tłoMenu, ustawTłoMenu] = hakStan(require("./assets/menu.png"));

    const ustawGreNaMenu = () => {
        ustawCzyGraJestWMenu(PRAWDA);
        ustawCzyGraJestWTrybŁatwy(KŁAMSTWO);
        ustawCzyGraJestWTrybŚredni(KŁAMSTWO);
        ustawCzyGraJestWTrybSzalony(KŁAMSTWO);
        ustawTłoMenu(require("./assets/menu.png"));
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

    return <Widok style={{backgroundColor: "#35f9f8", zIndex: -9999, flex: 1}}>
         <ObrazTło style={{flex: 1,  zIndex: -9999}} source={tłoMenu} resizeMode="cover" >
          <Widok style={{display: "flex", marginTop: 48,  zIndex: 0, flexDirection: "row"}}>
                        <DotykalnaPrzeźroczystość
                        onPress={ustawGreNaMenu}
                        style={{width: "25%", marginTop: 20, flex: 4}}>
                            <Widok style={{backgroundColor: czyGraJestWMenu ? "red" : "magenta", borderRadius: 15}}>
                                <Tekst style={{padding: 15, color: "white", fontWeight: czyGraJestWMenu ? "bold" : undefined }}>MENU</Tekst>
                            </Widok>
                        </DotykalnaPrzeźroczystość>
                        <DotykalnaPrzeźroczystość
                        onPress={ustawGreNaTrybŁatwy}
                        style={{width: "25%", marginTop: 20, flex: 4}}>
                            <Widok style={{backgroundColor: czyGraJestWTrybŁatwy ? "red" : "magenta", borderRadius: 15}}>
                                <Tekst style={{padding: 15, color: "white", fontWeight: czyGraJestWTrybŁatwy ? "bold" : undefined}}>PROSTY</Tekst>
                            </Widok>
                        </DotykalnaPrzeźroczystość>
                        <DotykalnaPrzeźroczystość
                        onPress={ustawGreNaTrybŚredni}
                        style={{width: "25%", marginTop: 20, flex: 4}}>
                            <Widok style={{backgroundColor: czyGraJestWTrybŚredni ? "red" : "magenta", borderRadius: 15,}}>
                                <Tekst style={{padding: 15, color: "white", fontWeight: czyGraJestWTrybŚredni ? "bold" : undefined}}>ŚREDNI</Tekst>
                            </Widok>
                        </DotykalnaPrzeźroczystość>
                        <DotykalnaPrzeźroczystość
                        onPress={ustawGreNaTrybSzalony}
                        style={{width: "25%", marginTop: 20, flex: 4}}>
                            <Widok style={{backgroundColor: czyGraJestWTrybSzalony ?  "red" : "magenta", borderRadius: 15}}>
                                <Tekst style={{padding: 15, color: "white", fontWeight: czyGraJestWTrybSzalony ? "bold" : undefined}}>SZALONY</Tekst>
                            </Widok>
                        </DotykalnaPrzeźroczystość>
                    </Widok>
        {czyGraJestWMenu && 
        <Widok style={{flex: 1}}>
           
               <WidokObrotowy>
               <Widok style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    paddingBottom: 30,
                }}>
                    <Tekst style={{
                        fontSize: 36,
                        marginTop: 60,
                        
                        opacity: 1,
                        color: "white"
                    }}>SPADAJONCE KULE PREZESA</Tekst>
                </Widok>
                <Widok style={{
                    backgroundColor: "black",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    marginTop: 10,
                    marginBottom: 10
                }}>
                    <Tekst style={{
                        fontSize: 24,
                        paddingTop: 10,
                        paddingBottom: 10,
                        opacity: 1,
                        color: "white"
                    }}>ZŁAP SPADAJONCOM KULE PREZESA ZANIM SPADNIE NA ZIEMIE</Tekst>
                </Widok>
                <Widok style={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    marginTop: 10,
                    marginBottom: 10
                }}>
                    <Tekst style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        paddingTop: 10,
                        paddingBottom: 10,
                        opacity: 1,
                        color: "white"
                    }}>TRYB GRY PROSTY</Tekst>
                    <Tekst style={{
                        fontSize: 14,
                        fontWeight: "200",
                        paddingTop: 10,
                        paddingBottom: 10,
                        opacity: 1,
                        color: "white"
                    }}>Tryb głównie do praktykowania gry. Maksymalna liczba punktów 20.</Tekst>
                </Widok>
                <Widok style={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    marginTop: 10,
                    marginBottom: 10
                }}>
                    <Tekst style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        paddingTop: 10,
                        paddingBottom: 10,
                        opacity: 1,
                        color: "white"
                    }}>TRYB GRY ŚREDNI</Tekst>
                    <Tekst style={{
                        fontSize: 14,
                        fontWeight: "200",
                        paddingTop: 10,
                        paddingBottom: 10,
                        opacity: 1,
                        color: "white"
                    }}>Będziesz miał super zabawe w tym trybie i sie nie zmęczysz ale te nie będzie łatwo. Maksymalna liczba punktów 20.</Tekst>
                </Widok>
                <Widok style={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    marginTop: 10,
                    marginBottom: 10
                }}>
                    <Tekst style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        paddingTop: 10,
                        paddingBottom: 10,
                        opacity: 1,
                        color: "white"
                    }}>TRYB GRY SZALONY</Tekst>
                    <Tekst style={{
                        fontSize: 14,
                        fontWeight: "200",
                        paddingTop: 10,
                        paddingBottom: 10,
                        opacity: 1,
                        color: "white"
                    }}>NAJTRUDNIEJSZY I TROSZKE SZALONY ALE ŚWIAT NALEZY DO ODWAZNYCH  Maksymalna liczba punktów 20 ALE DOJSCIE DO TEGO PULAPU TO CUD.</Tekst>
                </Widok>
                <Widok style={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    marginTop: 10,
                    marginBottom: 10
                }}>
                    <Tekst style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        paddingTop: 10,
                        paddingBottom: 10,
                        opacity: 1,
                        color: "white"
                    }}>POKNURSKU.PL</Tekst>
                    <Tekst style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        paddingTop: 10,
                        paddingBottom: 10,
                        opacity: 1,
                        color: "white"
                    }}>szkola programowania po polsku</Tekst>
                </Widok>
               </WidokObrotowy>
            
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
        </ObrazTło>
    </Widok>
}