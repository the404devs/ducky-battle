// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "levelBase":
            case "level2":return tiles.createTilemap(hex`14001500020707070707070707070707070707070707070408000000000000000000000000000000000000060800000000000000000000000000000000000006080000000000000000000000000000000000000608000000000000000000000000000000000000060800000000000000000000000000000000000006080000000000000000000000000000000000000608000000000000000000000000000000000000060800000000000000000000000000000000000006080000000000000000000000000000000000000608000000000000000000000000000000000000060800000000000000000000000000000000000006080000000000000000000000000000000000000608000000000000000000000000000000000000060800000000000000000000000000000000000006080000000000000000000000000000000000000608000000000000000000000000000000000000060800000000000000000000000000000000000006080000000000000000000000000000000000000601050505050505050505050505050505050505030909090909090909090909090909090909090909`, img`
22222222222222222222
2..................2
2..................2
2..................2
2..................2
2..................2
2..................2
2..................2
2..................2
2..................2
2..................2
2..................2
2..................2
2..................2
2..................2
2..................2
2..................2
2..................2
2..................2
22222222222222222222
22222222222222222222
`, [myTiles.transparency16,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterSouth1,sprites.dungeon.greenOuterEast0,sprites.dungeon.greenOuterNorth0,sprites.dungeon.greenOuterWest0,sprites.dungeon.floorDark0], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
