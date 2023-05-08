import React, { useState as hakStan, useEffect as hakEfekt } from "react";
import { View as Widok, 
ImageBackground as ObrazTło,
Dimensions, TouchableOpacity, Text} from "react-native";

var gameStarted = new Date().getTime();

export const KulaZero = ({podstawaGrawitacji, modyfikatorPrędkości, 
    limitPrędkości, początkoweKule, maxKule,
    przyrostKul}) => {
    const [kulsony, ustawKulsony] = hakStan([]);
    const [punkciki, ustawPunkciki] = hakStan(0);
    const [gameState, ustawGameState] = hakStan("BEZCZYNNOŚĆ");

    const {height, width} = Dimensions.get("screen");

    let lastFramUpdated = new Date().getTime();
   
    
    function createKulson(skin) {
        const scale = Math.random() * 50 + 50;
        return {
            color: skin,
            scale,
            x: Math.random() * (width - 2* scale) + scale,
            y: Math.random() * -200 - 150,
            obrutPapieza: 0,
            velocity: 1,
            isClickt: false,
            whenSpawn: null
        }
    }

    const renderLoopUpdate = () => {
        if(gameState !== "CZYNNOŚĆ") { 
            return;
        }

        ustawKulsony((poprzednieKulsony) => {
            const currentTime = new Date().getTime();
            const timeDelta = currentTime - lastFramUpdated;
               
            const secsElapsedPct = timeDelta / 1000;

            for(const kulson of poprzednieKulsony)
            {
                if(kulson.isClickt)
                {
                    if(currentTime < kulson.whenSpawn)
                    {
                        kulson.isClickt = false;
                        kulson.y = Math.random() * -200 - 150;
                        kulson.x = Math.random() * (width - 2* kulson.scale) + kulson.scale;
                        kulson.velocity = 1;
                    }
                }
                else if(secsElapsedPct > 0)
                {
                    kulson.y += podstawaGrawitacji * secsElapsedPct * kulson.velocity;
                    kulson.obrutPapieza += podstawaGrawitacji * kulson.velocity / 2 * secsElapsedPct;

                    if(kulson.obrutPapieza > 360)
                        kulson.obrutPapieza -= 360;

                    kulson.velocity += modyfikatorPrędkości * secsElapsedPct;
                    if(kulson.velocity > limitPrędkości)
                    {
                        console.log(kulson.velocity);
                        kulson.velocity = limitPrędkości;
                    }

                    if(kulson.y > height)
                    {
                        ustawGameState("PRZEJEBAŁEŚ");
                    }
                }
            }

            if(poprzednieKulsony.length < maxKule)
            {
                if(gameStarted + przyrostKul < currentTime)
                {
                    gameStarted = currentTime;
                    poprzednieKulsony.push(createKulson("pink")); 
                    console.log(gameStarted);  
                }   
            }

            return [...poprzednieKulsony];
        })
        lastFramUpdated = new Date().getTime();
        requestAnimationFrame(renderLoopUpdate);
    };

    // TODO: napraw kurwa ten błąd z velocity po restarcie po przegranej
    hakEfekt(() => {
        if(gameState === "CZYNNOŚĆ")
        {
            lastFramUpdated = new Date().getTime();
            gameStarted = new Date().getTime();
            const kulsonyDwa = [createKulson("magenta"), createKulson("pink")];
            ustawKulsony(kulsonyDwa);
            requestAnimationFrame(renderLoopUpdate);
        }
        else if(gameState === "PRZEJEBAŁEŚ") {
            ustawKulsony([]);
        }
    }, [gameState])

    function isPointInCircleInBox(point1, box, circle) {
        const {x: bx, y: by, width: bw, height: bh} = box;
        const {x: cx, y: cy, radius: cr} = circle;
        const {x: p1x, y: p1y} = point1;
    
        const isCircleInBox = (cx - cr >= bx) && (cx + cr <= bx + bw) && (cy - cr >= by) && (cy + cr <= by + bh);

        if (!isCircleInBox) {
            return false;
        }
    
        const isPointInCircle = (px, py) => {
            const dx = px - cx;
            const dy = py - cy;
            return dx * dx + dy * dy <= cr * cr;
        };
    
        return isPointInCircle(p1x, p1y);
    }
    
    
    return <Widok style={{zIndex: 999, width: "100%", height: "100%"}}>
        {gameState === "BEZCZYNNOŚĆ" && <Text onPress={() => {
            ustawGameState("CZYNNOŚĆ");
            ustawPunkciki(0);
        }} selectable={true} style={{position: "absolute", zIndex: 99999, fontSize: 24, fontWeight: "bold", left: 30, top: 30}}>
            Przyknurz tapa w ten tekst zeby odpalic gjerke!!!
        </Text> }
        {gameState === "CZYNNOŚĆ" && <Text selectable={false} style={{position: "absolute", zIndex: 99999, fontSize: 24, fontWeight: "bold", left: 30, top: 30}}>
            Punkciki: {punkciki}
        </Text> }
        {gameState === "PRZEJEBAŁEŚ" && <Text onPress={() => {
            const kulsonyDwa = [createKulson("magenta"), createKulson("pink")];
            ustawKulsony(() => {
                ustawPunkciki(() => {
                    ustawGameState(() => {
                        return "CZYNNOŚĆ"
                    });
                    return 0;
                });
                return kulsonyDwa;
            });
            
           
        }} selectable={true} style={{position: "absolute", width:"80%", marginLeft: "10%", zIndex: 99999, fontSize: 24, fontWeight: "bold", left: 30, top: 30}}>
            Punkciki {punkciki} {"\n"}
            CHOCIAZ BARDZO SIE STARALES TO PRZEJEBAŁEŚ {"\n"}
            PRZYKNURZ TAPA W TEN TEKST ZEBY SPROBOWAC PONOWNIE
        </Text> }
        {kulsony.map((kulson, index) => {
            return <TouchableOpacity activeOpacity={1}
            onPress={(e) => { 
                if(isPointInCircleInBox({x: e.nativeEvent.locationX, y: e.nativeEvent.locationY}, {x: 0, y:0, width: kulson.scale, height: kulson.scale}, {x: kulson.scale / 2, y: kulson.scale / 2, radius: kulson.scale / 2}))
                {
                    ustawKulsony((kulsony) => {
                        kulsony[kulsony.indexOf(kulson)].isClickt = true;
                        kulsony[kulsony.indexOf(kulson)].whenSpawn = new Date().getTime() + Math.random() * 5000 + 1000;
                        return [...kulsony];
                    });
                    ustawPunkciki((punkciki) => punkciki + 1);
                }
             }
            }
                        style={{
                        display: kulson.isClickt ? "none" : undefined,
                        backgroundColor: kulson.color,
                        borderRadius: 100,
                        width: kulson.scale,
                        height: kulson.scale,
                        zIndex: 999,
                        position: "absolute",
                        top: kulson.y,
                        left: kulson.x,
                        overflow: "hidden"
                    }} key={String(index)}>
                        <ObrazTło style={{    
                        width: kulson.scale,
                        transform: [{ rotate: `${kulson.obrutPapieza}deg` }],
                        height: kulson.scale}} source={require("./assets/rareSkin.png")} resizeMode="cover" >
                        </ObrazTło>
                    </TouchableOpacity>
        })}
    </Widok>;
}