namespace SpriteKind {
    export const duckBullet = SpriteKind.create()
    export const Heart = SpriteKind.create()
    export const gui = SpriteKind.create()
}
/**
 * TODO:
 * 
 * Still softlocks on level gen sometimes
 * 
 * Too many red ducks sometimes
 */
function aim (target: Sprite, source: Sprite) {
    x1 = target.x
    y1 = target.y
    x2 = source.x
    y2 = source.y
    distance = getDistanceBetween2Points(x1, y1, x2, y2)
    if (distance == 0) {
        return [0, 0]
    }
    speed = 100
    vx = dx / distance * speed
    vy = dy / distance * speed
    vector = [vx, vy]
    return vector
}
function getDistanceBetween2Points (x1: number, y1: number, x2: number, y2: number) {
    dx = x1 - x2
    dy = y1 - y2
    distance = Math.sqrt(dx * dx + dy * dy)
    return distance
}
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.duckBullet, function (sprite, otherSprite) {
    if (!(sprites.readDataBoolean(sprite, "isdead"))) {
        animation.runImageAnimation(
        sprite,
        [img`
            . . . . . . . . . b 2 b . . . . 
            . . . . . . . . . b 2 b . . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 2 2 2 2 2 b . . . 
            . . . . b b 2 b c 2 2 e 4 c . . 
            . b b b b 2 2 2 b f e e 4 4 4 b 
            . b e 2 b 2 2 b c b 4 4 4 4 b . 
            . . b 2 2 b 2 2 2 4 4 4 4 b . . 
            . . b e 2 2 b 2 2 2 2 2 2 b . . 
            . b e b 2 2 2 e 2 2 2 2 2 2 b . 
            b e e c e 2 2 b 2 2 2 2 2 2 b . 
            c e e e c c b 2 2 2 2 2 2 2 b . 
            c b e e e e e 2 2 2 2 2 2 2 b . 
            . c e e e e e e 2 2 2 2 2 e b . 
            . . c b e e e e e 2 2 2 b b . . 
            . . . c c c c c c c c b b . . . 
            `,img`
            . . . . . . . . . b 2 b . . . . 
            . . . . . . . . . b 2 b . . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 2 2 2 2 2 b . . . 
            . . . . b b 2 b c 2 4 e 4 c . . 
            . b b b 2 2 2 2 b 4 4 e 4 4 4 b 
            . b e 2 2 4 2 b 4 5 4 4 4 4 b . 
            . . b 2 2 2 4 d 5 5 4 4 4 b . . 
            . . b e 2 2 5 5 5 5 4 2 2 b . . 
            . b e b 2 2 2 5 5 5 5 4 2 2 b . 
            b e e c e 2 2 5 4 2 4 4 2 2 b . 
            c e e e c c 4 4 2 2 2 4 4 2 b . 
            c b e e e 4 4 2 2 2 2 2 2 2 b . 
            . c e e e e e e 2 2 2 2 2 e b . 
            . . c b e e e e e 2 2 2 b b . . 
            . . . c c c c c c c c b b . . . 
            `,img`
            . 3 . . . . . . . . . . . 4 . . 
            . 3 3 . . . . . . . . . 4 4 . . 
            . 3 d 3 . . 4 4 . . 4 4 d 4 . . 
            . . 3 5 3 4 5 5 4 4 d d 4 4 . . 
            . . 3 d 5 d 1 1 d 5 5 d 4 4 . . 
            . . 4 5 5 1 1 1 1 5 1 1 5 4 . . 
            . 4 5 5 5 5 1 1 5 1 1 1 d 4 4 . 
            . 4 d 5 1 1 5 5 5 1 1 1 5 5 4 . 
            . 4 4 5 1 1 5 5 5 5 5 d 5 5 4 . 
            . . 4 3 d 5 5 5 d 5 5 d d d 4 . 
            . 4 5 5 d 5 5 5 d d d 5 5 4 . . 
            . 4 5 5 d 3 5 d d 3 d 5 5 4 . . 
            . 4 4 d d 4 d d d 4 3 d d 4 . . 
            . . 4 5 4 4 4 4 4 4 4 4 4 . . . 
            . 4 5 4 . . 4 4 4 . . . 4 4 . . 
            . 4 4 . . . . . . . . . . 4 4 . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . b b . b b b . . . . . 
            . . . . b 1 1 b 1 1 1 b . . . . 
            . . b b 3 1 1 d d 1 d d b b . . 
            . b 1 1 d d b b b b b 1 1 b . . 
            . b 1 1 1 b . . . . . b d d b . 
            . . 3 d d b . . . . . b d 1 1 b 
            . b 1 d 3 . . . . . . . b 1 1 b 
            . b 1 1 b . . . . . . b b 1 d b 
            . b 1 d b . . . . . . b d 3 d b 
            . b b d d b . . . . b d d d b . 
            . b d d d d b . b b 3 d d 3 b . 
            . . b d d 3 3 b d 3 3 b b b . . 
            . . . b b b d d d d d b . . . . 
            . . . . . . b b b b b . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        100,
        false
        )
        sprites.setDataBoolean(sprite, "isdead", true)
        sprites.destroy(otherSprite)
        sprite.unfollow()
        sprite.setFlag(SpriteFlag.Ghost, true)
        otherSprite.setVelocity(0, 0)
        music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
        info.changeScoreBy(2)
        pause(500)
        sprites.destroy(sprite)
        spawnEvilDucks(1)
    }
})
function pxToTileCoord (num: number) {
    return Math.floor(num / 16 - 0)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameStart) {
        playerShoot()
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameStart) {
        jump()
    }
})
function grantInvincibility () {
    lewis.setFlag(SpriteFlag.GhostThroughSprites, true)
    if (lastDirection == -1) {
        animation.runImageAnimation(
        lewis,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . c . . . . . . . . 
            `,img`
            . . . . b 5 b . . . . . . . . . 
            . . . . b 5 b . . . . . . . . . 
            . . . . b b b b b b . . . . . . 
            . . . b 5 5 5 5 5 b b . . . . . 
            . . c 4 d 5 5 c b 5 b b . . . . 
            b 4 4 4 d d f b 5 5 5 b b b b . 
            . b 4 4 4 4 b c b 5 5 b 5 d b . 
            . . b 4 4 4 4 5 5 5 b 5 5 b . . 
            . . b 5 5 5 5 5 5 b 5 5 d b . . 
            . b 5 5 5 5 5 5 d 5 5 5 b d b . 
            . b 5 5 5 5 5 5 b 5 5 d c d d b 
            . b 5 5 5 5 5 5 5 b c c d d d c 
            . b 5 5 5 5 5 5 5 d d d d d b c 
            . b d 5 5 5 5 5 d d d d d d c . 
            . . b b 5 5 5 d d d d d b c . . 
            . . . b b c c c c c c c c . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . c . . . . . . . . 
            `,img`
            . . . . b 5 b . . . . . . . . . 
            . . . . b 5 b . . . . . . . . . 
            . . . . b b b b b b . . . . . . 
            . . . b 5 5 5 5 5 b b . . . . . 
            . . c 4 d 5 5 c b 5 b b . . . . 
            b 4 4 4 d d f b 5 5 5 b b b b . 
            . b 4 4 4 4 b c b 5 5 b 5 d b . 
            . . b 4 4 4 4 5 5 5 b 5 5 b . . 
            . . b 5 5 5 5 5 5 b 5 5 d b . . 
            . b 5 5 5 5 5 5 d 5 5 5 b d b . 
            . b 5 5 5 5 5 5 b 5 5 d c d d b 
            . b 5 5 5 5 5 5 5 b c c d d d c 
            . b 5 5 5 5 5 5 5 d d d d d b c 
            . b d 5 5 5 5 5 d d d d d d c . 
            . . b b 5 5 5 d d d d d b c . . 
            . . . b b c c c c c c c c . . . 
            `],
        100,
        false
        )
    } else {
        animation.runImageAnimation(
        lewis,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . c . . . . . . . . 
            `,img`
            . . . . . . . . . b 5 b . . . . 
            . . . . . . . . . b 5 b . . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 5 5 5 5 5 b . . . 
            . . . . b b 5 b c 5 5 d 4 c . . 
            . b b b b 5 5 5 b f d d 4 4 4 b 
            . b d 5 b 5 5 b c b 4 4 4 4 b . 
            . . b 5 5 b 5 5 5 4 4 4 4 b . . 
            . . b d 5 5 b 5 5 5 5 5 5 b . . 
            . b d b 5 5 5 d 5 5 5 5 5 5 b . 
            b d d c d 5 5 b 5 5 5 5 5 5 b . 
            c d d d c c b 5 5 5 5 5 5 5 b . 
            c b d d d d d 5 5 5 5 5 5 5 b . 
            . c d d d d d d 5 5 5 5 5 d b . 
            . . c b d d d d d 5 5 5 b b . . 
            . . . c c c c c c c c b b . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . c . . . . . . . . 
            `,img`
            . . . . . . . . . b 5 b . . . . 
            . . . . . . . . . b 5 b . . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 5 5 5 5 5 b . . . 
            . . . . b b 5 b c 5 5 d 4 c . . 
            . b b b b 5 5 5 b f d d 4 4 4 b 
            . b d 5 b 5 5 b c b 4 4 4 4 b . 
            . . b 5 5 b 5 5 5 4 4 4 4 b . . 
            . . b d 5 5 b 5 5 5 5 5 5 b . . 
            . b d b 5 5 5 d 5 5 5 5 5 5 b . 
            b d d c d 5 5 b 5 5 5 5 5 5 b . 
            c d d d c c b 5 5 5 5 5 5 5 b . 
            c b d d d d d 5 5 5 5 5 5 5 b . 
            . c d d d d d d 5 5 5 5 5 d b . 
            . . c b d d d d d 5 5 5 b b . . 
            . . . c c c c c c c c b b . . . 
            `],
        100,
        false
        )
    }
    pause(500)
    lewis.setFlag(SpriteFlag.GhostThroughSprites, false)
    forcePlayerSpriteUpdate()
}
function showTitleScreen () {
    effects.starField.startScreenEffect()
    version = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 1 1 1 1 1 . . 
        . . . . . . . . 1 1 . . . 1 1 . 
        . . . . . . . . . . . . . 1 1 . 
        1 1 . . . 1 1 . . 1 1 1 1 1 . . 
        1 1 . . . 1 1 . 1 1 . . . . . . 
        1 1 . . . 1 1 . 1 1 . . . . . . 
        . 1 1 . 1 1 . . 1 1 . . . . . . 
        . . 1 1 1 . . . 1 1 1 1 1 1 1 . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.gui)
    buttonPrompt = sprites.create(img`
        ..........666666666666..........
        ........6667777777777666........
        ......66677777777777777666......
        .....6677777779999777777766.....
        ....667777779966669977777766....
        ....677777799668866117777776....
        ...66777779966877861197777766...
        ...66777799668677686699777766...
        ...88777796688888888669777788...
        ...88777788888888888888777788...
        ...88977888679999997688877988...
        ...88977886777777777768877988...
        ...88997777777777777777779988...
        ...88799777777777777777711788...
        ...88679997777777777779117688...
        ..cc866679999999999999976668cc..
        .ccbc6666679999999999766666cbcc.
        .fcbcc66666666666666666666ccbcf.
        .fcbbcc666666666666666666ccbdcf.
        .fcbbbccc66666666666666cccbddcf.
        .fccbbbbccccccccccccccccbdddbcf.
        .fcccbbbbbccccccccccccb111ddccf.
        .fcccccbbbddddddddddddd111dcccf.
        .fcccccccbbddddddddddddddbbcccf.
        .fccccccccccccccbbbbbbbbbdbcccf.
        ..fccccccccccbbbbbbbbbbbddbccf..
        ..fccccccccccbbbbbbbbbbbddbccf..
        ..ffcccccccccbbbbbbbbbbbddbcff..
        ...ffccccccccbbbbbbbbbbbddbff...
        ....ffcccccccbbbbbbbbbbbdbff....
        ......ffccccbbbbbbbbbbbbff......
        ........ffffffffffffffff........
        `, SpriteKind.gui)
    title1 = sprites.create(assets.image`DUCKY`, SpriteKind.gui)
    title2 = sprites.create(assets.image`BATTLE`, SpriteKind.gui)
    guiDuck1 = sprites.create(img`
        . . . . . . . . . . b 2 b . . . 
        . . . . . . . . . b 2 b . . . . 
        . . . . . . . . . b c . . . . . 
        . . . . . . b b b b b b . . . . 
        . . . . . b b 2 2 2 2 2 b . . . 
        . . . . b b 2 d 1 f 2 2 e f . . 
        . . . . b 2 2 1 f f 2 e 4 c . . 
        . . . . b 2 2 d f b e e 4 4 . . 
        b e e e b b e 2 2 2 4 4 4 4 4 b 
        b b e 2 2 2 b 2 2 4 4 4 4 4 b . 
        b e c 2 2 2 2 e 2 2 2 2 2 b . . 
        c e e c e 2 2 b 2 2 2 2 2 2 b . 
        c b e e c c b 2 2 2 2 2 2 2 b . 
        . c e e e e e e 2 2 2 2 2 d b . 
        . . c b e e e e e 2 2 2 b b . . 
        . . . c c c c c c c c b b . . . 
        `, SpriteKind.gui)
    guiDuck2 = sprites.create(img`
        . . . . b 5 b . . . . . . . . . 
        . . . . b 5 b . . . . . . . . . 
        . . . . b b b b b b . . . . . . 
        . . . b 5 5 5 5 5 b b . . . . . 
        . . c 4 d 5 5 c b 5 b b . . . . 
        b 4 4 4 d d f b 5 5 5 b b b b . 
        . b 4 4 4 4 b c b 5 5 b 5 d b . 
        . . b 4 4 4 4 5 5 5 b 5 5 b . . 
        . . b 5 5 5 5 5 5 b 5 5 d b . . 
        . b 5 5 5 5 5 5 d 5 5 5 b d b . 
        . b 5 5 5 5 5 5 b 5 5 d c d d b 
        . b 5 5 5 5 5 5 5 b c c d d d c 
        . b 5 5 5 5 5 5 5 d d d d d b c 
        . b d 5 5 5 5 5 d d d d d d c . 
        . . b b 5 5 5 d d d d d b c . . 
        . . . b b c c c c c c c c . . . 
        `, SpriteKind.gui)
    subtitle = sprites.create(assets.image`subtitle`, SpriteKind.gui)
    subtitle.setPosition(80, 114)
    version.setPosition(10, 8)
    title1.scale = 2
    title2.scale = 2.5
    guiDuck1.scale = 2
    guiDuck2.scale = 2
    title1.rotationDegrees = -18
    title2.rotationDegrees = -18
    title1.setPosition(60, 25)
    title2.setPosition(75, 48)
    guiDuck1.setPosition(35, 90)
    guiDuck2.setPosition(85, 80)
    title1.z = 2
    title2.z = 1
    buttonPrompt.setPosition(140, 80)
    animation.runImageAnimation(
    buttonPrompt,
    [img`
        ..........666666666666..........
        ........6667777777777666........
        ......66677777777777777666......
        .....6677777779999777777766.....
        ....667777779966669977777766....
        ....677777799668866117777776....
        ...66777779966877861197777766...
        ...66777799668677686699777766...
        ...88777796688888888669777788...
        ...88777788888888888888777788...
        ...88977888679999997688877988...
        ...88977886777777777768877988...
        ...88997777777777777777779988...
        ...88799777777777777777711788...
        ...88679997777777777779117688...
        ..cc866679999999999999976668cc..
        .ccbc6666679999999999766666cbcc.
        .fcbcc66666666666666666666ccbcf.
        .fcbbcc666666666666666666ccbdcf.
        .fcbbbccc66666666666666cccbddcf.
        .fccbbbbccccccccccccccccbdddbcf.
        .fcccbbbbbccccccccccccb111ddccf.
        .fcccccbbbddddddddddddd111dcccf.
        .fcccccccbbddddddddddddddbbcccf.
        .fccccccccccccccbbbbbbbbbdbcccf.
        ..fccccccccccbbbbbbbbbbbddbccf..
        ..fccccccccccbbbbbbbbbbbddbccf..
        ..ffcccccccccbbbbbbbbbbbddbcff..
        ...ffccccccccbbbbbbbbbbbddbff...
        ....ffcccccccbbbbbbbbbbbdbff....
        ......ffccccbbbbbbbbbbbbff......
        ........ffffffffffffffff........
        `,img`
        ................................
        ................................
        ................................
        ................................
        ................................
        ..........888888888888..........
        ........8887777777777888........
        ......88877666666666677888......
        .....8877666667777666667788.....
        ....887666667788887766666788....
        ....866666677888888996666678....
        ...88666667788877889976666688...
        ...88666677888677688877666688...
        ...88666778888888888887766688...
        ...88667788888888888888776688...
        ..cc866788866777777668887668cc..
        .ccbc8668866666666666688668cbcc.
        .fcbcc86666666666666666668ccbcf.
        .fcbbcc886666666666666688ccbdcf.
        .fcbbbccc88888888888888cccbddcf.
        .fccbbbbccccccccccccccccbdddbcf.
        .fcccbbbbbccccccccccccb11dddccf.
        .fcccccbbbdddddddddddd111ddcccf.
        .fcccccccbbddddddddddd11dbbcccf.
        .fccccccccccccccbbbbbbbbbdbcccf.
        ..fccccccccccbbbbbbbbbbbddbccf..
        ..fccccccccccbbbbbbbbbbbddbccf..
        ..ffcccccccccbbbbbbbbbbbddbcff..
        ...ffccccccccbbbbbbbbbbbddbff...
        ....ffcccccccbbbbbbbbbbbdbff....
        ......ffccccbbbbbbbbbbbbff......
        ........ffffffffffffffff........
        `],
    500,
    true
    )
    animation.runImageAnimation(
    guiDuck1,
    [img`
        . . . . . . . . . . . b . . . . 
        . . . . . . . . . . . b . . . . 
        . . . . . . . . . b 2 2 b . . . 
        . . . . . . b b b b b b . . . . 
        . . . . . b b 2 2 2 2 2 b . . . 
        . b b b b b 2 2 2 2 2 2 2 b . . 
        . b e 2 b 2 2 2 2 2 2 2 2 b . . 
        . . b 2 2 b 2 d 1 f 2 e 4 f . . 
        . . b e 2 2 b 1 f f 2 4 4 c . . 
        b b e b 2 2 2 d f b 4 4 4 4 b . 
        b e e c e 2 2 b 2 4 4 4 4 4 4 b 
        c e e e c c b 2 2 2 2 2 2 2 b . 
        c b e e e e e 2 2 2 2 2 2 2 b . 
        . c e e e e e e 2 2 2 2 2 e b . 
        . . c b e e e e e 2 2 2 b b . . 
        . . . c c c c c c c c b b . . . 
        `,img`
        . . . . . . . . . . . b . . . . 
        . . . . . . . . . . b 2 b . . . 
        . . . . . . . . . b 2 b . . . . 
        . . . . . . b b b b b b . . . . 
        . . . . . b b 2 2 2 2 2 b . . . 
        . b b b b b 2 2 2 2 2 2 2 b . . 
        . b e 2 b 2 2 2 2 2 2 2 2 b . . 
        . . b 2 2 b 2 d 1 f 2 e 4 f . . 
        . . b e 2 2 b 1 f f 2 4 4 c . . 
        b b e b 2 2 2 d f b 4 4 4 4 4 b 
        b e e c e 2 2 b 2 4 4 4 4 4 b . 
        c e e e c c b 2 2 2 2 2 2 2 b . 
        c b e e e e e 2 2 2 2 2 2 2 b . 
        . c e e e e e e 2 2 2 2 2 e b . 
        . . c b e e e e e 2 2 2 b b . . 
        . . . c c c c c c c c b b . . . 
        `,img`
        . . . . . . . . . . b 2 b . . . 
        . . . . . . . . . b 2 b . . . . 
        . . . . . . . . . b c . . . . . 
        . . . . . . b b b b b b . . . . 
        . . . . . b b 2 2 2 2 2 b . . . 
        . . . . b b 2 d 1 f 2 2 e f . . 
        . . . . b 2 2 1 f f 2 e 4 c . . 
        . . . . b 2 2 d f b e e 4 4 . . 
        b e e e b b e 2 2 2 4 4 4 4 4 b 
        b b e 2 2 2 b 2 2 4 4 4 4 4 b . 
        b e c 2 2 2 2 e 2 2 2 2 2 b . . 
        c e e c e 2 2 b 2 2 2 2 2 2 b . 
        c b e e c c b 2 2 2 2 2 2 2 b . 
        . c e e e e e e 2 2 2 2 2 e b . 
        . . c b e e e e e 2 2 2 b b . . 
        . . . c c c c c c c c b b . . . 
        `,img`
        . . . . . . . . . . b 2 b . . . 
        . . . . . . . . . b 2 b . . . . 
        . . . . . . b b b b b b . . . . 
        . . . . . b b 2 2 2 2 2 b . . . 
        . . . . b b 2 d 1 f 2 e 4 c . . 
        . . . . b 2 2 1 f f e e 4 4 4 b 
        . . . . b 2 2 d f b 4 4 4 4 b . 
        . . . b e 2 2 2 2 4 4 4 4 b . . 
        . . b e e 2 2 2 2 2 2 2 2 b . . 
        . b e e e e 2 2 2 2 2 2 2 2 b . 
        b e e e b b b 2 2 2 2 2 2 2 b . 
        c e e b 2 2 e c 2 2 2 2 2 2 b . 
        c b b e 2 e c e 2 2 2 2 2 2 b . 
        . b 2 2 b c e e 2 2 2 2 2 e b . 
        b b c c c e e e e 2 2 2 b b . . 
        . . . c c c c c c c c b b . . . 
        `,img`
        . . . . . . . . . . b 2 b . . . 
        . . . . . . . . . b 2 b . . . . 
        . . . . . . b b b b b b . . . . 
        . . . . . b b 2 2 2 2 2 b . . . 
        . . . . b b 2 d 1 f 2 e 4 c . . 
        . . . . b 2 2 1 f f e e 4 4 4 b 
        . . . . b 2 2 d f b 4 4 4 4 b . 
        . . . b e 2 2 2 2 4 4 4 4 b . . 
        . b b e e e 2 2 2 2 2 2 2 b . . 
        b e e e b b b 2 2 2 2 2 2 2 b . 
        c e e b 2 2 e c 2 2 2 2 2 2 b . 
        c b b e 2 e c e 2 2 2 2 2 2 b . 
        c b 2 2 b c e e 2 2 2 2 2 2 b . 
        b b c c c e e e 2 2 2 2 2 e b . 
        . . . . c c e e e 2 2 2 b b . . 
        . . . . . . c c c c c b b . . . 
        `,img`
        . . . . . . . . . . b 2 b . . . 
        . . . . . . . . . b 2 b . . . . 
        . . . . . . b b b b b b . . . . 
        . . . . . b b 2 2 2 2 2 b . . . 
        . . . . b b 2 d 1 f 2 2 e f . . 
        . . . . b 2 2 1 f f 2 e 4 c . . 
        . . . . b 2 2 d f b e e 4 4 . . 
        . b b b e 2 2 2 2 2 4 4 4 4 4 b 
        b e e e b b e 2 2 4 4 4 4 4 b . 
        b b e 2 2 2 b 2 2 2 2 2 2 b . . 
        c e c 2 2 2 2 e 2 2 2 2 2 2 b . 
        c b e c e 2 2 b 2 2 2 2 2 2 b . 
        . c e e c c b e 2 2 2 2 2 e b . 
        . . c b e e e e e 2 2 2 b b . . 
        . . . c c c c c c c c b b . . . 
        . . . . . . . c . . . . . . . . 
        `],
    100,
    true
    )
    animation.runImageAnimation(
    guiDuck2,
    assets.animation`lewis_norm_l`,
    100,
    true
    )
    animation.runMovementAnimation(
    title1,
    animation.animationPresets(animation.bobbing),
    2000,
    true
    )
    animation.runMovementAnimation(
    title2,
    animation.animationPresets(animation.bobbing),
    2000,
    true
    )
    logo = img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffcffffffffffcffffffffffffffffffffffffffffcffffffffffcffffffffffffffffffffffffffffcffffffffffcffffffffffffffffffffffffffffcffffffffffcffffffffffffffffffffff
        ffffffffffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffffc
        fffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffff
        fffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcffffffffffff
        fff3fffffffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbffffffffffff
        ffb3bffffffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcffffffffffff
        f33333ffffffffffffccfffffffffffffffffffff33333ffffffffffffccfffffffffffffffffffff33333ffffffffffffccfffffffffffffffffffff33333ffffffffffffccffffffffffffffffffff
        ff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffff
        ffbfbfffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffff
        fffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcffff
        fffffffffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcfffff
        ffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffff
        fffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fcfffffffffffffffffffffffffcfffffffffffffcfffffffffffffffffffffffffcfffffffffffffcfffffffffffffffffffffffffcfffffffffffffcfffffffffffffffffffffffffcffffffffffff
        fffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffccfffffcffffffffffffffffffffffffffffffffccfffffcffffffffffffffffffffffffffffffffccfffffcffffffffffffffffffffffffffffffffccfffffcffffffffffffffffffffffffff
        ffffffccfffffffffffffcccccccccccffffffffffffffccfffffffffffffcccccccccccffffffffffffffccfffffffffffffcccccccccccffffffffffffffccfffffffffffffcccccccccccffffffff
        ffffffffffffffffccccccccccccccccccccffffffffffffffffffffccccccccccccccccccccffffffffffffffffffffccccccccccccccccccccffffffffffffffffffffccccccccccccccccccccffff
        fffffffffffffccccccccccccccccccccccccccffffffffffffffccccccccccccccccccccccccccffffffffffffffccccccccccccccccccccccccccffffffffffffffccccccccccccccccccccccccccf
        ccfffffffffcccccccccccccccccccccccccccccccfffffffffcccccccccccccccccccccccccccccccfffffffffcccccccccccccccccccccccccccccccfffffffffccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        bbbbbbbbbbbbccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccbbbbbbbb
        bbbbbbbbbbbbbbbbbccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbb
        bbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbb
        bbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbb
        bbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbb
        3bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb33333333
        333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb
        cc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccc
        cccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcc
        cccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccc
        bbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbb333333bbb33ddddddddddddddddd33bbbbbbbbbb333333bbb33ddddddddddddddddd33bbbbbbbbbb333333bbb33ddddddddddddddddd33bbbbbbbbbb333333bbb33ddddddddddddddddd33bbbbbbb
        bbb33333ddddddddddddddddddddddddddddd3bbbbb33333ddddddddddddddddddddddddddddd3bbbbb33333ddddddddddddddddddddddddddddd3bbbbb33333ddddddddddddddddddddddddddddd3bb
        dddddddddddddddddddddddddddddddd33333ddddddddddddddddddddddddddddddddddd33333ddddddddddddddddddddddddddddddddddd33333ddddddddddddddddddddddddddddddddddd33333ddd
        dddddddddddddd3333333333ddddddd33dddd33ddddddddddddddd3333333333ddddddd33dddd33ddddddddddddddd3333333333ddddddd33dddd33ddddddddddddddd3333333333ddddddd33dddd33d
        dddddddddddd333ddddddddd33dddddbbbbbbbbddddddddddddd333ddddddddd33dddddbbbbbbbbddddddddddddd333ddddddddd33dddddbbbbbbbbddddddddddddd333ddddddddd33dddddbbbbbbbbd
        ddddddddddd333d3bbbbbbbbd33dddddbbbbbbddddddddddddd333d3bbbbbbbbd33dddddbbbbbbddddddddddddd333d3bbbbbbbbd33dddddbbbbbbddddddddddddd333d3bbbbbbbbd33dddddbbbbbbdd
        ddddddddddd33bbbbbbbbbbbb33dddddddddddddddddddddddd33bbbbbbbbbbbb33dddddddddddddddddddddddd33bbbbbbbbbbbb33dddddddddddddddddddddddd33bbbbbbbbbbbb33ddddddddddddd
        ddddddddddddbbbbbbbbbbbbbbddddddddddddddddddddddddddbbbbbbbbbbbbbbddddddddddddddddddddddddddbbbbbbbbbbbbbbddddddddddddddddddddddddddbbbbbbbbbbbbbbdddddddddddddd
        ddddddddddddd3bbbbbbbbbb3dddddddddddddddddddddddddddd3bbbbbbbbbb3dddddddddddddddddddddddddddd3bbbbbbbbbb3dddddddddddddddddddddddddddd3bbbbbbbbbb3ddddddddddddddd
        d333333ddddddddd333333ddddddddddddddddddd333333ddddddddd333333ddddddddddddddddddd333333ddddddddd333333ddddddddddddddddddd333333ddddddddd333333dddddddddddddddddd
        333333333dddddddddddddddddddddddddddddd3333333333dddddddddddddddddddddddddddddd3333333333dddddddddddddddddddddddddddddd3333333333dddddddddddddddddddddddddddddd3
        33333333dddddddddddddddddddddddddddddddd33333333dddddddddddddddddddddddddddddddd33333333dddddddddddddddddddddddddddddddd33333333dddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddd3333333333333ddddddddddddddddddddddddddd3333333333333ddddddddddddddddddddddddddd3333333333333ddddddddddddddddddddddddddd3333333333333d
        33ddddddddddddddddddddd333dddddddddddd3333ddddddddddddddddddddd333dddddddddddd3333ddddddddddddddddddddd333dddddddddddd3333ddddddddddddddddddddd333dddddddddddd33
        d333ddddddddddddddddd333ddddddddddddddddd333ddddddddddddddddd333ddddddddddddddddd333ddddddddddddddddd333ddddddddddddddddd333ddddddddddddddddd333dddddddddddddddd
        ddd33ddddddddddddddd33dddd3bbbbbbbbbbb3dddd33ddddddddddddddd33dddd3bbbbbbbbbbb3dddd33ddddddddddddddd33dddd3bbbbbbbbbbb3dddd33ddddddddddddddd33dddd3bbbbbbbbbbb3d
        b3dd3ddddddddddddddd3dd3bbbbbbbbbbbbbbbbb3dd3ddddddddddddddd3dd3bbbbbbbbbbbbbbbbb3dd3ddddddddddddddd3dd3bbbbbbbbbbbbbbbbb3dd3ddddddddddddddd3dd3bbbbbbbbbbbbbbbb
        bb333ddddddddddddddd33bbbbbbbbbbbbbbbbbbbb333ddddddddddddddd33bbbbbbbbbbbbbbbbbbbb333ddddddddddddddd33bbbbbbbbbbbbbbbbbbbb333ddddddddddddddd33bbbbbbbbbbbbbbbbbb
        bbb3dddddddddddddddd3bbbbbbbbbbbbbbbbbbbbbb3dddddddddddddddd3bbbbbbbbbbbbbbbbbbbbbb3dddddddddddddddd3bbbbbbbbbbbbbbbbbbbbbb3dddddddddddddddd3bbbbbbbbbbbbbbbbbbb
        b3ddddddddddddddddddd3bbbbbbbbbbbbbbbbbbb3ddddddddddddddddddd3bbbbbbbbbbbbbbbbbbb3ddddddddddddddddddd3bbbbbbbbbbbbbbbbbbb3ddddddddddddddddddd3bbbbbbbbbbbbbbbbbb
        dddddddddddddddddddddddd3bbbbbbbbbbbbb33dddddddddddddddddddddddd3bbbbbbbbbbbbb33dddddddddddddddddddddddd3bbbbbbbbbbbbb33dddddddddddddddddddddddd3bbbbbbbbbbbbb33
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddd3333333333333ddddddddddddddddddddddddddd3333333333333ddddddddddddddddddddddddddd3333333333333ddddddddddddddddddddddddddd3333333333333ddddddddddddddddd
        dddddd333333333333333333333ddddddddddddddddddd333333333333333333333ddddddddddddddddddd333333333333333333333ddddddddddddddddddd333333333333333333333ddddddddddddd
        dddd3333333333333333ddd3333333dddddddddddddd3333333333333333ddd3333333dddddddddddddd3333333333333333ddd3333333dddddddddddddd3333333333333333ddd3333333dddddddddd
        dd3333333333333333333dddddd333333ddddddddd3333333333333333333dddddd333333ddddddddd3333333333333333333dddddd333333ddddddddd3333333333333333333dddddd333333ddddddd
        3333333333333333333333ddddddddddddddd3333333333333333333333333ddddddddddddddd3333333333333333333333333ddddddddddddddd3333333333333333333333333ddddddddddddddd333
        33333333333333333333333333dddddddd33333333333333333333333333333333dddddddd33333333333333333333333333333333dddddddd33333333333333333333333333333333dddddddd333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        `
    yEnd = 110 / 3
    for (let index = 0; index <= 61; index++) {
        y1 = index + 30
        x2 = y1 * 3
        if (y1 >= 91) {
            logo.drawLine(0, y1, x2, 0, 11)
        } else if (y1 <= 32 || y1 >= 88) {
            logo.drawLine(0, y1, x2, 0, 1)
        } else {
            logo.drawLine(0, y1, x2, 0, 15)
        }
    }
    scene.setBackgroundImage(logo)
    pauseUntil(() => controller.A.isPressed())
    effects.starField.endScreenEffect()
    music.play(music.createSoundEffect(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.gui)
    scene.setBackgroundImage(img`
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffcffffffffffcffffffffffffffffffffffffffffcffffffffffcffffffffffffffffffffffffffffcffffffffffcffffffffffffffffffffffffffffcffffffffffcffffffffffffffffffffff
        ffffffffffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffffcffffffffffffffffcbcffffffffffffffffffffc
        fffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffff
        fffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcffffffffffff
        fff3fffffffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbfffffffffffffff3fffffffffffffffffffffbbbffffffffffff
        ffb3bffffffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcffffffffffffffb3bffffffffffffffffffffcbcffffffffffff
        f33333ffffffffffffccfffffffffffffffffffff33333ffffffffffffccfffffffffffffffffffff33333ffffffffffffccfffffffffffffffffffff33333ffffffffffffccffffffffffffffffffff
        ff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffffff3b3fffffffffffffccffffffffffffffffffff
        ffbfbfffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffffffbfbfffffffffffffffffffffffffffffcfffff
        fffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcffff
        fffffffffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcffffffffffffffffcffffffffffffffffffffffcfffff
        ffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffffffffffffffcbcfffffffffffffffffffffffffff
        fffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        fcfffffffffffffffffffffffffcfffffffffffffcfffffffffffffffffffffffffcfffffffffffffcfffffffffffffffffffffffffcfffffffffffffcfffffffffffffffffffffffffcffffffffffff
        fffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffffffffffcfffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        ffffffccfffffcffffffffffffffffffffffffffffffffccfffffcffffffffffffffffffffffffffffffffccfffffcffffffffffffffffffffffffffffffffccfffffcffffffffffffffffffffffffff
        ffffffccfffffffffffffcccccccccccffffffffffffffccfffffffffffffcccccccccccffffffffffffffccfffffffffffffcccccccccccffffffffffffffccfffffffffffffcccccccccccffffffff
        ffffffffffffffffccccccccccccccccccccffffffffffffffffffffccccccccccccccccccccffffffffffffffffffffccccccccccccccccccccffffffffffffffffffffccccccccccccccccccccffff
        fffffffffffffccccccccccccccccccccccccccffffffffffffffccccccccccccccccccccccccccffffffffffffffccccccccccccccccccccccccccffffffffffffffccccccccccccccccccccccccccf
        ccfffffffffcccccccccccccccccccccccccccccccfffffffffcccccccccccccccccccccccccccccccfffffffffcccccccccccccccccccccccccccccccfffffffffccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
        bbbbbbbbbbbbccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccbbbbbbbb
        bbbbbbbbbbbbbbbbbccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbb
        bbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbbbbbbbbbbb3333333bbbbbbbbb33cbbbbbbbbbbbb
        bbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbbbbbbbbb33cccccbb33bbbbbbbccbbccbbbbbbbbb
        bbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbbbbbbbbbcccbbbbbcccbbbbbbbbccccbbbbbbbbbb
        3bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb333333333bbbbbbbcccccccccbbbbbbbbbbbbbbb33333333
        333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb333bbbbbbbcccccbbbbbbbbbbbbbbb333ccbbbbb
        cc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccccc3bbbbbbbbbbbbbbbbbbbbbbbbbbb3cccbbbccc
        cccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcccccbbbbbbbbbbbb333bbbbbb3bbbbbcccbbbbbcc
        cccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccccccbbbbbbbbbbbb333bbbbbbbbbbbbcccccccccc
        cbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccc
        bbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb3333bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbb333333bbb33ddddddddddddddddd33bbbbbbbbbb333333bbb33ddddddddddddddddd33bbbbbbbbbb333333bbb33ddddddddddddddddd33bbbbbbbbbb333333bbb33ddddddddddddddddd33bbbbbbb
        bbb33333ddddddddddddddddddddddddddddd3bbbbb33333ddddddddddddddddddddddddddddd3bbbbb33333ddddddddddddddddddddddddddddd3bbbbb33333ddddddddddddddddddddddddddddd3bb
        dddddddddddddddddddddddddddddddd33333ddddddddddddddddddddddddddddddddddd33333ddddddddddddddddddddddddddddddddddd33333ddddddddddddddddddddddddddddddddddd33333ddd
        dddddddddddddd3333333333ddddddd33dddd33ddddddddddddddd3333333333ddddddd33dddd33ddddddddddddddd3333333333ddddddd33dddd33ddddddddddddddd3333333333ddddddd33dddd33d
        dddddddddddd333ddddddddd33dddddbbbbbbbbddddddddddddd333ddddddddd33dddddbbbbbbbbddddddddddddd333ddddddddd33dddddbbbbbbbbddddddddddddd333ddddddddd33dddddbbbbbbbbd
        ddddddddddd333d3bbbbbbbbd33dddddbbbbbbddddddddddddd333d3bbbbbbbbd33dddddbbbbbbddddddddddddd333d3bbbbbbbbd33dddddbbbbbbddddddddddddd333d3bbbbbbbbd33dddddbbbbbbdd
        ddddddddddd33bbbbbbbbbbbb33dddddddddddddddddddddddd33bbbbbbbbbbbb33dddddddddddddddddddddddd33bbbbbbbbbbbb33dddddddddddddddddddddddd33bbbbbbbbbbbb33ddddddddddddd
        ddddddddddddbbbbbbbbbbbbbbddddddddddddddddddddddddddbbbbbbbbbbbbbbddddddddddddddddddddddddddbbbbbbbbbbbbbbddddddddddddddddddddddddddbbbbbbbbbbbbbbdddddddddddddd
        ddddddddddddd3bbbbbbbbbb3dddddddddddddddddddddddddddd3bbbbbbbbbb3dddddddddddddddddddddddddddd3bbbbbbbbbb3dddddddddddddddddddddddddddd3bbbbbbbbbb3ddddddddddddddd
        d333333ddddddddd333333ddddddddddddddddddd333333ddddddddd333333ddddddddddddddddddd333333ddddddddd333333ddddddddddddddddddd333333ddddddddd333333dddddddddddddddddd
        333333333dddddddddddddddddddddddddddddd3333333333dddddddddddddddddddddddddddddd3333333333dddddddddddddddddddddddddddddd3333333333dddddddddddddddddddddddddddddd3
        33333333dddddddddddddddddddddddddddddddd33333333dddddddddddddddddddddddddddddddd33333333dddddddddddddddddddddddddddddddd33333333dddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddd3333333333333ddddddddddddddddddddddddddd3333333333333ddddddddddddddddddddddddddd3333333333333ddddddddddddddddddddddddddd3333333333333d
        33ddddddddddddddddddddd333dddddddddddd3333ddddddddddddddddddddd333dddddddddddd3333ddddddddddddddddddddd333dddddddddddd3333ddddddddddddddddddddd333dddddddddddd33
        d333ddddddddddddddddd333ddddddddddddddddd333ddddddddddddddddd333ddddddddddddddddd333ddddddddddddddddd333ddddddddddddddddd333ddddddddddddddddd333dddddddddddddddd
        ddd33ddddddddddddddd33dddd3bbbbbbbbbbb3dddd33ddddddddddddddd33dddd3bbbbbbbbbbb3dddd33ddddddddddddddd33dddd3bbbbbbbbbbb3dddd33ddddddddddddddd33dddd3bbbbbbbbbbb3d
        b3dd3ddddddddddddddd3dd3bbbbbbbbbbbbbbbbb3dd3ddddddddddddddd3dd3bbbbbbbbbbbbbbbbb3dd3ddddddddddddddd3dd3bbbbbbbbbbbbbbbbb3dd3ddddddddddddddd3dd3bbbbbbbbbbbbbbbb
        bb333ddddddddddddddd33bbbbbbbbbbbbbbbbbbbb333ddddddddddddddd33bbbbbbbbbbbbbbbbbbbb333ddddddddddddddd33bbbbbbbbbbbbbbbbbbbb333ddddddddddddddd33bbbbbbbbbbbbbbbbbb
        bbb3dddddddddddddddd3bbbbbbbbbbbbbbbbbbbbbb3dddddddddddddddd3bbbbbbbbbbbbbbbbbbbbbb3dddddddddddddddd3bbbbbbbbbbbbbbbbbbbbbb3dddddddddddddddd3bbbbbbbbbbbbbbbbbbb
        b3ddddddddddddddddddd3bbbbbbbbbbbbbbbbbbb3ddddddddddddddddddd3bbbbbbbbbbbbbbbbbbb3ddddddddddddddddddd3bbbbbbbbbbbbbbbbbbb3ddddddddddddddddddd3bbbbbbbbbbbbbbbbbb
        dddddddddddddddddddddddd3bbbbbbbbbbbbb33dddddddddddddddddddddddd3bbbbbbbbbbbbb33dddddddddddddddddddddddd3bbbbbbbbbbbbb33dddddddddddddddddddddddd3bbbbbbbbbbbbb33
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        dddddddddd3333333333333ddddddddddddddddddddddddddd3333333333333ddddddddddddddddddddddddddd3333333333333ddddddddddddddddddddddddddd3333333333333ddddddddddddddddd
        dddddd333333333333333333333ddddddddddddddddddd333333333333333333333ddddddddddddddddddd333333333333333333333ddddddddddddddddddd333333333333333333333ddddddddddddd
        dddd3333333333333333ddd3333333dddddddddddddd3333333333333333ddd3333333dddddddddddddd3333333333333333ddd3333333dddddddddddddd3333333333333333ddd3333333dddddddddd
        dd3333333333333333333dddddd333333ddddddddd3333333333333333333dddddd333333ddddddddd3333333333333333333dddddd333333ddddddddd3333333333333333333dddddd333333ddddddd
        3333333333333333333333ddddddddddddddd3333333333333333333333333ddddddddddddddd3333333333333333333333333ddddddddddddddd3333333333333333333333333ddddddddddddddd333
        33333333333333333333333333dddddddd33333333333333333333333333333333dddddddd33333333333333333333333333333333dddddddd33333333333333333333333333333333dddddddd333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333
        `)
}
function spawnCoins (num: number) {
    for (let index2 = 0; index2 < num; index2++) {
        coin = sprites.create(img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `, SpriteKind.Food)
        preferredX = roundToNearestInterval(randint(20, 230), 16)
        preferredY = roundToNearestInterval(randint(20, 230), 16)
        while (!(tiles.tileAtLocationEquals(tiles.getTileLocation(pxToTileCoord(preferredX), pxToTileCoord(preferredY)), assets.tile`transparency16`))) {
            preferredX = roundToNearestInterval(randint(20, 230), 16)
            preferredY = roundToNearestInterval(randint(20, 230), 16)
        }
        coin.setPosition(preferredX, preferredY)
        animation.runImageAnimation(
        coin,
        [img`
            . . b b b b . . 
            . b 5 5 5 5 b . 
            b 5 d 3 3 d 5 b 
            b 5 3 5 5 1 5 b 
            c 5 3 5 5 1 d c 
            c d d 1 1 d d c 
            . f d d d d f . 
            . . f f f f . . 
            `,img`
            . . b b b . . . 
            . b 5 5 5 b . . 
            b 5 d 3 d 5 b . 
            b 5 3 5 1 5 b . 
            c 5 3 5 1 d c . 
            c 5 d 1 d d c . 
            . f d d d f . . 
            . . f f f . . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . b 5 d 1 5 b . 
            . b 5 3 1 5 b . 
            . c 5 3 1 d c . 
            . c 5 1 d d c . 
            . . f d d f . . 
            . . . f f . . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . . b 1 1 b . . 
            . . b 5 5 b . . 
            . . b d d b . . 
            . . c d d c . . 
            . . c 3 3 c . . 
            . . . f f . . . 
            `,img`
            . . . b b . . . 
            . . b 5 5 b . . 
            . b 5 1 d 5 b . 
            . b 5 1 3 5 b . 
            . c d 1 3 5 c . 
            . c d d 1 5 c . 
            . . f d d f . . 
            . . . f f . . . 
            `,img`
            . . . b b b . . 
            . . b 5 5 5 b . 
            . b 5 d 3 d 5 b 
            . b 5 1 5 3 5 b 
            . c d 1 5 3 5 c 
            . c d d 1 d 5 c 
            . . f d d d f . 
            . . . f f f . . 
            `],
        200,
        true
        )
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameStart) {
        lastDirection = -1
        animation.runImageAnimation(
        lewis,
        lewis_left_anim,
        100,
        true
        )
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Heart, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    info.changeLifeBy(1)
})
info.onCountdownEnd(function () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    game.splash("Level " + level + " complete!", "Score: " + info.score())
    level += 1
    initLevel()
})
function makeBadGuysShoot () {
    allBadGuys = sprites.allOfKind(SpriteKind.Enemy)
    for (let bad_guy of allBadGuys) {
        index = allBadGuys.indexOf(bad_guy)
        if ((game.runtime() + index) % shootRate == 0 && !(sprites.readDataBoolean(bad_guy, "isdead"))) {
            vector = aim(lewis, bad_guy)
            projectile = sprites.createProjectileFromSprite(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 4 4 . . . . . . . 
                . . . . . . 4 5 5 4 . . . . . . 
                . . . . . . 2 5 5 2 . . . . . . 
                . . . . . . . 2 2 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, bad_guy, vector[0], vector[1])
            projectile.setFlag(SpriteFlag.AutoDestroy, true)
            projectile.setFlag(SpriteFlag.BounceOnWall, false)
            projectile.setFlag(SpriteFlag.DestroyOnWall, true)
            music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
            cooldown = shootRate
        }
    }
}
function playerShoot () {
    nearest_bad_guy = computeNearestBadGuyToPlayer()
    if (nearest_bad_guy != null) {
        vector = aim(nearest_bad_guy, lewis)
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . 3 1 1 3 . . . . . . 
            . . . . . 2 1 1 1 1 2 . . . . . 
            . . . . . 2 1 1 1 1 2 . . . . . 
            . . . . . . 3 1 1 3 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, lewis, vector[0], vector[1])
        projectile.setFlag(SpriteFlag.AutoDestroy, true)
        projectile.setFlag(SpriteFlag.BounceOnWall, false)
        projectile.setFlag(SpriteFlag.DestroyOnWall, true)
        projectile.setKind(SpriteKind.duckBullet)
        music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameStart) {
        lastDirection = 1
        animation.runImageAnimation(
        lewis,
        lewis_right_anim,
        100,
        true
        )
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    animation.runImageAnimation(
    otherSprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 4 4 . . . . . . . 
        . . . . . . 4 5 5 4 . . . . . . 
        . . . . . . 2 5 5 2 . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . 4 . . . . . 
        . . . . 2 . . . . 4 4 . . . . . 
        . . . . 2 4 . . 4 5 4 . . . . . 
        . . . . . 2 4 d 5 5 4 . . . . . 
        . . . . . 2 5 5 5 5 4 . . . . . 
        . . . . . . 2 5 5 5 5 4 . . . . 
        . . . . . . 2 5 4 2 4 4 . . . . 
        . . . . . . 4 4 . . 2 4 4 . . . 
        . . . . . 4 4 . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . 3 . . . . . . . . . . . 4 . . 
        . 3 3 . . . . . . . . . 4 4 . . 
        . 3 d 3 . . 4 4 . . 4 4 d 4 . . 
        . . 3 5 3 4 5 5 4 4 d d 4 4 . . 
        . . 3 d 5 d 1 1 d 5 5 d 4 4 . . 
        . . 4 5 5 1 1 1 1 5 1 1 5 4 . . 
        . 4 5 5 5 5 1 1 5 1 1 1 d 4 4 . 
        . 4 d 5 1 1 5 5 5 1 1 1 5 5 4 . 
        . 4 4 5 1 1 5 5 5 5 5 d 5 5 4 . 
        . . 4 3 d 5 5 5 d 5 5 d d d 4 . 
        . 4 5 5 d 5 5 5 d d d 5 5 4 . . 
        . 4 5 5 d 3 5 d d 3 d 5 5 4 . . 
        . 4 4 d d 4 d d d 4 3 d d 4 . . 
        . . 4 5 4 4 4 4 4 4 4 4 4 . . . 
        . 4 5 4 . . 4 4 4 . . . 4 4 . . 
        . 4 4 . . . . . . . . . . 4 4 . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . b b . b b b . . . . . 
        . . . . b 1 1 b 1 1 1 b . . . . 
        . . b b 3 1 1 d d 1 d d b b . . 
        . b 1 1 d d b b b b b 1 1 b . . 
        . b 1 1 1 b . . . . . b d d b . 
        . . 3 d d b . . . . . b d 1 1 b 
        . b 1 d 3 . . . . . . . b 1 1 b 
        . b 1 1 b . . . . . . b b 1 d b 
        . b 1 d b . . . . . . b d 3 d b 
        . b b d d b . . . . b d d d b . 
        . b d d d d b . b b 3 d d 3 b . 
        . . b d d 3 3 b d 3 3 b b b . . 
        . . . b b b d d d d d b . . . . 
        . . . . . . b b b b b . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    100,
    false
    )
    otherSprite.setVelocity(0, 0)
    scene.cameraShake(2, 500)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    info.changeScoreBy(-1)
    info.changeLifeBy(-1)
    grantInvincibility()
    pause(500)
    sprites.destroy(otherSprite)
})
function generateRandomPlatforms () {
    x = 1
    for (let index2 = 0; index2 < 14; index2++) {
        y = 1
        for (let index2 = 0; index2 < 14; index2++) {
            if (randint(0, 5) == 0) {
                tiles.setTileAt(tiles.getTileLocation(x, y), sprites.dungeon.floorDark0)
                tiles.setWallAt(tiles.getTileLocation(x, y), true)
            }
            y += 1
        }
        x += 1
    }
}
function spawnEvilDucks (num: number) {
    for (let index2 = 0; index2 < num; index2++) {
        coin = sprites.create(img`
            . . . . . . . . . . b 2 b . . . 
            . . . . . . . . . b 2 b . . . . 
            . . . . . . . . . b c . . . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 2 2 2 2 2 b . . . 
            . . . . b b 2 d 1 f 2 2 e f . . 
            . . . . b 2 2 1 f f 2 e 4 c . . 
            . . . . b 2 2 d f b e e 4 4 . . 
            b e e e b b e 2 2 2 4 4 4 4 4 b 
            b b e 2 2 2 b 2 2 4 4 4 4 4 b . 
            b e c 2 2 2 2 e 2 2 2 2 2 b . . 
            c e e c e 2 2 b 2 2 2 2 2 2 b . 
            c b e e c c b 2 2 2 2 2 2 2 b . 
            . c e e e e e e 2 2 2 2 2 d b . 
            . . c b e e e e e 2 2 2 b b . . 
            . . . c c c c c c c c b b . . . 
            `, SpriteKind.Enemy)
        preferredX = roundToNearestInterval(randint(20, 230), 16)
        preferredY = roundToNearestInterval(randint(20, 230), 16)
        playerX = lewis.x
        playerY = lewis.y
        distance = getDistanceBetween2Points(preferredX, preferredY, playerX, playerY)
        sprites.setDataBoolean(coin, "isdead", false)
        while (!(tiles.tileAtLocationEquals(tiles.getTileLocation(pxToTileCoord(preferredX), pxToTileCoord(preferredY)), assets.tile`transparency16`)) || distance < 96) {
            playerX = lewis.x
            playerY = lewis.y
            preferredX = roundToNearestInterval(randint(20, 230), 16)
            preferredY = roundToNearestInterval(randint(20, 230), 16)
            distance = getDistanceBetween2Points(preferredX, preferredY, playerX, playerY)
        }
        coin.setPosition(preferredX, preferredY)
        coin.follow(lewis, 50)
        animation.runImageAnimation(
        coin,
        [img`
            . . . . . . . . . . . b . . . . 
            . . . . . . . . . . . b . . . . 
            . . . . . . . . . b 2 2 b . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 2 2 2 2 2 b . . . 
            . b b b b b 2 2 2 2 2 2 2 b . . 
            . b e 2 b 2 2 2 2 2 2 2 2 b . . 
            . . b 2 2 b 2 d 1 f 2 d 4 f . . 
            . . b e 2 2 b 1 f f 2 4 4 c . . 
            b b e b 2 2 2 d f b 4 4 4 4 b . 
            b e e c e 2 2 b 2 4 4 4 4 4 4 b 
            c e e e c c b 2 2 2 2 2 2 2 b . 
            c b e e e e e 2 2 2 2 2 2 2 b . 
            . c e e e e e e 2 2 2 2 2 d b . 
            . . c b e e e e e 2 2 2 b b . . 
            . . . c c c c c c c c b b . . . 
            `,img`
            . . . . . . . . . . . b . . . . 
            . . . . . . . . . . b 2 b . . . 
            . . . . . . . . . b 2 b . . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 2 2 2 2 2 b . . . 
            . b b b b b 2 2 2 2 2 2 2 b . . 
            . b e 2 b 2 2 2 2 2 2 2 2 b . . 
            . . b 2 2 b 2 d 1 f 2 e 4 f . . 
            . . b e 2 2 b 1 f f 2 4 4 c . . 
            b b e b 2 2 2 d f b 4 4 4 4 4 b 
            b e e c e 2 2 b 2 4 4 4 4 4 b . 
            c e e e c c b 2 2 2 2 2 2 2 b . 
            c b e e e e e 2 2 2 2 2 2 2 b . 
            . c e e e e e e 2 2 2 2 2 e b . 
            . . c b e e e e e 2 2 2 b b . . 
            . . . c c c c c c c c b b . . . 
            `,img`
            . . . . . . . . . . b 2 b . . . 
            . . . . . . . . . b 2 b . . . . 
            . . . . . . . . . b c . . . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 2 2 2 2 2 b . . . 
            . . . . b b 2 d 1 f 2 2 e f . . 
            . . . . b 2 2 1 f f 2 e 4 c . . 
            . . . . b 2 2 d f b e e 4 4 . . 
            b e e e b b e 2 2 2 4 4 4 4 4 b 
            b b e 2 2 2 b 2 2 4 4 4 4 4 b . 
            b e c 2 2 2 2 e 2 2 2 2 2 b . . 
            c e e c e 2 2 b 2 2 2 2 2 2 b . 
            c b e e c c b 2 2 2 2 2 2 2 b . 
            . c e e e e e e 2 2 2 2 2 e b . 
            . . c b e e e e e 2 2 2 b b . . 
            . . . c c c c c c c c b b . . . 
            `,img`
            . . . . . . . . . . b 2 b . . . 
            . . . . . . . . . b 2 b . . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 2 2 2 2 2 b . . . 
            . . . . b b 2 d 1 f 2 e 4 c . . 
            . . . . b 2 2 1 f f e e 4 4 4 b 
            . . . . b 2 2 d f b 4 4 4 4 b . 
            . . . b e 2 2 2 2 4 4 4 4 b . . 
            . . b e e 2 2 2 2 2 2 2 2 b . . 
            . b e e e e 2 2 2 2 2 2 2 2 b . 
            b e e e b b b 2 2 2 2 2 2 2 b . 
            c e e b 2 2 e c 2 2 2 2 2 2 b . 
            c b b e 2 e c e 2 2 2 2 2 2 b . 
            . b 2 2 b c e e 2 2 2 2 2 e b . 
            b b c c c e e e e 2 2 2 b b . . 
            . . . c c c c c c c c b b . . . 
            `,img`
            . . . . . . . . . . b 2 b . . . 
            . . . . . . . . . b 2 b . . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 2 2 2 2 2 b . . . 
            . . . . b b 2 d 1 f 2 e 4 c . . 
            . . . . b 2 2 1 f f e e 4 4 4 b 
            . . . . b 2 2 d f b 4 4 4 4 b . 
            . . . b e 2 2 2 2 4 4 4 4 b . . 
            . b b e e e 2 2 2 2 2 2 2 b . . 
            b e e e b b b 2 2 2 2 2 2 2 b . 
            c e e b 2 2 e c 2 2 2 2 2 2 b . 
            c b b e 2 e c e 2 2 2 2 2 2 b . 
            c b 2 2 b c e e 2 2 2 2 2 2 b . 
            b b c c c e e e 2 2 2 2 2 e b . 
            . . . . c c e e e 2 2 2 b b . . 
            . . . . . . c c c c c b b . . . 
            `,img`
            . . . . . . . . . . b 2 b . . . 
            . . . . . . . . . b 2 b . . . . 
            . . . . . . b b b b b b . . . . 
            . . . . . b b 2 2 2 2 2 b . . . 
            . . . . b b 2 d 1 f 2 2 e f . . 
            . . . . b 2 2 1 f f 2 e 4 c . . 
            . . . . b 2 2 d f b e e 4 4 . . 
            . b b b e 2 2 2 2 2 4 4 4 4 4 b 
            b e e e b b e 2 2 4 4 4 4 4 b . 
            b b e 2 2 2 b 2 2 2 2 2 2 b . . 
            c e c 2 2 2 2 e 2 2 2 2 2 2 b . 
            c b e c e 2 2 b 2 2 2 2 2 2 b . 
            . c e e c c b e 2 2 2 2 2 e b . 
            . . c b e e e e e 2 2 2 b b . . 
            . . . c c c c c c c c b b . . . 
            . . . . . . . c . . . . . . . . 
            `],
        100,
        true
        )
    }
}
info.onLifeZero(function () {
    music.stopAllSounds()
    music.play(music.melodyPlayable(music.spooky), music.PlaybackMode.InBackground)
    animation.runImageAnimation(
    lewis,
    [img`
        . . . . . . . . . b 5 b . . . . 
        . . . . . . . . . b 5 b . . . . 
        . . . . . . b b b b b b . . . . 
        . . . . . b b 5 5 5 5 5 b . . . 
        . . . . b b 5 b c 5 5 d 4 c . . 
        . b b b b 5 5 5 b f d d 4 4 4 b 
        . b d 5 b 5 5 b c b 4 4 4 4 b . 
        . . b 5 5 b 5 5 5 4 4 4 4 b . . 
        . . b d 5 5 b 5 5 5 5 5 5 b . . 
        . b d b 5 5 5 d 5 5 5 5 5 5 b . 
        b d d c d 5 5 b 5 5 5 5 5 5 b . 
        c d d d c c b 5 5 5 5 5 5 5 b . 
        c b d d d d d 5 5 5 5 5 5 5 b . 
        . c d d d d d d 5 5 5 5 5 d b . 
        . . c b d d d d d 5 5 5 b b . . 
        . . . c c c c c c c c b b . . . 
        `,img`
        . . . . . . . . . b 5 b . . . . 
        . . . . . . . . . b 5 b . . . . 
        . . . . . . b b b b b b . . . . 
        . . . . . b b 5 5 5 5 5 b . . . 
        . . . . b b 5 b c 5 4 d 4 c . . 
        . b b b 2 5 5 5 b 4 4 d 4 4 4 b 
        . b d 5 2 4 5 b 4 5 4 4 4 4 b . 
        . . b 5 5 2 4 d 5 5 4 4 4 b . . 
        . . b d 5 2 5 5 5 5 4 5 5 b . . 
        . b d b 5 5 2 5 5 5 5 4 5 5 b . 
        b d d c d 5 2 5 4 2 4 4 5 5 b . 
        c d d d c c 4 4 5 5 2 4 4 5 b . 
        c b d d d 4 4 5 5 5 5 5 5 5 b . 
        . c d d d d d d 5 5 5 5 5 d b . 
        . . c b d d d d d 5 5 5 b b . . 
        . . . c c c c c c c c b b . . . 
        `,img`
        . 3 . . . . . . . . . . . 4 . . 
        . 3 3 . . . . . . . . . 4 4 . . 
        . 3 d 3 . . 4 4 . . 4 4 d 4 . . 
        . . 3 5 3 4 5 5 4 4 d d 4 4 . . 
        . . 3 d 5 d 1 1 d 5 5 d 4 4 . . 
        . . 4 5 5 1 1 1 1 5 1 1 5 4 . . 
        . 4 5 5 5 5 1 1 5 1 1 1 d 4 4 . 
        . 4 d 5 1 1 5 5 5 1 1 1 5 5 4 . 
        . 4 4 5 1 1 5 5 5 5 5 d 5 5 4 . 
        . . 4 3 d 5 5 5 d 5 5 d d d 4 . 
        . 4 5 5 d 5 5 5 d d d 5 5 4 . . 
        . 4 5 5 d 3 5 d d 3 d 5 5 4 . . 
        . 4 4 d d 4 d d d 4 3 d d 4 . . 
        . . 4 5 4 4 4 4 4 4 4 4 4 . . . 
        . 4 5 4 . . 4 4 4 . . . 4 4 . . 
        . 4 4 . . . . . . . . . . 4 4 . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . b b . b b b . . . . . 
        . . . . b 1 1 b 1 1 1 b . . . . 
        . . b b 3 1 1 d d 1 d d b b . . 
        . b 1 1 d d b b b b b 1 1 b . . 
        . b 1 1 1 b . . . . . b d d b . 
        . . 3 d d b . . . . . b d 1 1 b 
        . b 1 d 3 . . . . . . . b 1 1 b 
        . b 1 1 b . . . . . . b b 1 d b 
        . b 1 d b . . . . . . b d 3 d b 
        . b b d d b . . . . b d d d b . 
        . b d d d d b . b b 3 d d 3 b . 
        . . b d d 3 3 b d 3 3 b b b . . 
        . . . b b b d d d d d b . . . . 
        . . . . . . b b b b b . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    200,
    false
    )
    pause(100)
    if (info.score() > 0) {
        game.setGameOverMessage(true, "You Died!")
        game.setGameOverEffect(true, effects.dissolve)
        game.setGameOverPlayable(true, music.melodyPlayable(music.wawawawaa), false)
        game.gameOver(true)
    } else {
        game.setGameOverMessage(false, "You Died!")
        game.setGameOverEffect(true, effects.dissolve)
        game.setGameOverPlayable(false, music.melodyPlayable(music.wawawawaa), false)
        game.gameOver(false)
    }
})
function jump () {
    jumping = true
    // else if: either fell off a ledge, or double jumping
    if (lewis.isHittingTile(CollisionDirection.Bottom)) {
        lewis.vy = -120
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1, 3328, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        canDoubleJump = true
    } else if (canDoubleJump) {
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1264, 2054, 255, 0, 500, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        lewis_right_anim = lewis_right_boost
        lewis_left_anim = lewis_left_boost
        forcePlayerSpriteUpdate()
        lewis.startEffect(effects.trail, 500)
        scene.cameraShake(2, 250)
        lewis.vy = -200
        canDoubleJump = false
    }
}
function spawnHearts (num: number) {
    for (let index2 = 0; index2 < num; index2++) {
        coin = sprites.create(img`
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            .......22...22......
            ......2322.2222.....
            ......232222222.....
            ......222222222.....
            .......22222b2......
            ........222b2.......
            .........222........
            ..........2.........
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            `, SpriteKind.Heart)
        preferredX = roundToNearestInterval(randint(20, 230), 16)
        preferredY = roundToNearestInterval(randint(20, 230), 16)
        while (!(tiles.tileAtLocationEquals(tiles.getTileLocation(pxToTileCoord(preferredX), pxToTileCoord(preferredY)), assets.tile`transparency16`))) {
            preferredX = roundToNearestInterval(randint(20, 230), 16)
            preferredY = roundToNearestInterval(randint(20, 230), 16)
        }
        coin.setPosition(preferredX, preferredY)
        animation.runImageAnimation(
        coin,
        [img`
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            .......22...22......
            ......2322.2222.....
            ......232222222.....
            ......222222222.....
            .......22222b2......
            ........222b2.......
            .........222........
            ..........2.........
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            `,img`
            ....................
            ....................
            ....................
            ....................
            ....................
            .......22...22......
            ......2322.2222.....
            ......232222222.....
            ......222222222.....
            .......22222b2......
            ........222b2.......
            .........222........
            ..........2.........
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            `,img`
            ....................
            ....................
            ....................
            ....................
            .......22...22......
            ......2322.2222.....
            ......232222222.....
            ......222222222.....
            .......22222b2......
            ........222b2.......
            .........222........
            ..........2.........
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            `,img`
            ....................
            ....................
            ....................
            ....................
            ....................
            .......22...22......
            ......2322.2222.....
            ......232222222.....
            ......222222222.....
            .......22222b2......
            ........222b2.......
            .........222........
            ..........2.........
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            `],
        200,
        true
        )
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    info.changeScoreBy(1)
    spawnCoins(1)
})
function spawnPlayer () {
    lewis_left_norm = assets.animation`lewis_norm_l`
    lewis_right_norm = assets.animation`lewis_norm_r`
    lewis_left_boost = assets.animation`lewis_boost_l`
    lewis_right_boost = assets.animation`lewis_boost_r`
    lewis_left_anim = lewis_left_norm
    lewis_right_anim = lewis_right_norm
    lewis = sprites.create(assets.image`duck_r`, SpriteKind.Player)
    animation.runImageAnimation(
    lewis,
    lewis_right_norm,
    100,
    true
    )
    preferredX = roundToNearestInterval(randint(20, 230), 16)
    preferredY = roundToNearestInterval(randint(20, 230), 16)
    row = pxToTileCoord(preferredY)
    col = pxToTileCoord(preferredX)
    while (!(tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), assets.tile`transparency16`)) && !(tiles.tileAtLocationIsWall(tiles.getTileLocation(col, row - 1)))) {
        preferredX = roundToNearestInterval(randint(20, 230), 16)
        preferredY = roundToNearestInterval(randint(20, 230), 16)
        row = pxToTileCoord(preferredY)
        col = pxToTileCoord(preferredX)
    }
    lewis.setPosition(preferredX, preferredY)
    lewis.ay = 294.3
    scene.cameraFollowSprite(lewis)
}
function computeNearestBadGuyToPlayer () {
    let list = 0
    nearest_bad_guy = sprites.allOfKind(list)[0]
    distance_to_nearest_bad_guy = 10000
    for (let bad_guy of sprites.allOfKind(SpriteKind.Enemy)) {
        x1 = lewis.x
        y1 = lewis.y
        x2 = bad_guy.x
        y2 = bad_guy.y
        dx = x1 - x2
        dy = y1 - y2
        distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < distance_to_nearest_bad_guy && !(sprites.readDataBoolean(bad_guy, "isdead"))) {
            distance_to_nearest_bad_guy = distance
            nearest_bad_guy = bad_guy
        }
    }
    return nearest_bad_guy
}
function initLevel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.Heart)
    info.startCountdown(30)
    tiles.setCurrentTilemap(tilemap`level2`)
    generateRandomPlatforms()
    spawnPlayer()
    spawnCoins(20)
    spawnEvilDucks(level)
    game.splash("Level " + level)
}
function forcePlayerSpriteUpdate () {
    if (lastDirection == -1) {
        animation.runImageAnimation(
        lewis,
        lewis_left_anim,
        100,
        true
        )
    } else {
        animation.runImageAnimation(
        lewis,
        lewis_right_anim,
        100,
        true
        )
    }
}
function roundToNearestInterval (input2: number, interval: number) {
    spriteOffset = 8
    clampedValue = Math.floor(input2 / interval) * interval
    return clampedValue + spriteOffset
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    animation.runImageAnimation(
    otherSprite,
    [img`
        . . . . . . . . . b 2 b . . . . 
        . . . . . . . . . b 2 b . . . . 
        . . . . . . b b b b b b . . . . 
        . . . . . b b 2 2 2 2 2 b . . . 
        . . . . b b 2 b c 2 2 e 4 c . . 
        . b b b b 2 2 2 b f e e 4 4 4 b 
        . b e 2 b 2 2 b c b 4 4 4 4 b . 
        . . b 2 2 b 2 2 2 4 4 4 4 b . . 
        . . b e 2 2 b 2 2 2 2 2 2 b . . 
        . b e b 2 2 2 e 2 2 2 2 2 2 b . 
        b e e c e 2 2 b 2 2 2 2 2 2 b . 
        c e e e c c b 2 2 2 2 2 2 2 b . 
        c b e e e e e 2 2 2 2 2 2 2 b . 
        . c e e e e e e 2 2 2 2 2 e b . 
        . . c b e e e e e 2 2 2 b b . . 
        . . . c c c c c c c c b b . . . 
        `,img`
        . . . . . . . . . b 2 b . . . . 
        . . . . . . . . . b 2 b . . . . 
        . . . . . . b b b b b b . . . . 
        . . . . . b b 2 2 2 2 2 b . . . 
        . . . . b b 2 b c 2 4 e 4 c . . 
        . b b b 2 2 2 2 b 4 4 e 4 4 4 b 
        . b e 2 2 4 2 b 4 5 4 4 4 4 b . 
        . . b 2 2 2 4 d 5 5 4 4 4 b . . 
        . . b e 2 2 5 5 5 5 4 2 2 b . . 
        . b e b 2 2 2 5 5 5 5 4 2 2 b . 
        b e e c e 2 2 5 4 2 4 4 2 2 b . 
        c e e e c c 4 4 2 2 2 4 4 2 b . 
        c b e e e 4 4 2 2 2 2 2 2 2 b . 
        . c e e e e e e 2 2 2 2 2 e b . 
        . . c b e e e e e 2 2 2 b b . . 
        . . . c c c c c c c c b b . . . 
        `,img`
        . 3 . . . . . . . . . . . 4 . . 
        . 3 3 . . . . . . . . . 4 4 . . 
        . 3 d 3 . . 4 4 . . 4 4 d 4 . . 
        . . 3 5 3 4 5 5 4 4 d d 4 4 . . 
        . . 3 d 5 d 1 1 d 5 5 d 4 4 . . 
        . . 4 5 5 1 1 1 1 5 1 1 5 4 . . 
        . 4 5 5 5 5 1 1 5 1 1 1 d 4 4 . 
        . 4 d 5 1 1 5 5 5 1 1 1 5 5 4 . 
        . 4 4 5 1 1 5 5 5 5 5 d 5 5 4 . 
        . . 4 3 d 5 5 5 d 5 5 d d d 4 . 
        . 4 5 5 d 5 5 5 d d d 5 5 4 . . 
        . 4 5 5 d 3 5 d d 3 d 5 5 4 . . 
        . 4 4 d d 4 d d d 4 3 d d 4 . . 
        . . 4 5 4 4 4 4 4 4 4 4 4 . . . 
        . 4 5 4 . . 4 4 4 . . . 4 4 . . 
        . 4 4 . . . . . . . . . . 4 4 . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . b b . b b b . . . . . 
        . . . . b 1 1 b 1 1 1 b . . . . 
        . . b b 3 1 1 d d 1 d d b b . . 
        . b 1 1 d d b b b b b 1 1 b . . 
        . b 1 1 1 b . . . . . b d d b . 
        . . 3 d d b . . . . . b d 1 1 b 
        . b 1 d 3 . . . . . . . b 1 1 b 
        . b 1 1 b . . . . . . b b 1 d b 
        . b 1 d b . . . . . . b d 3 d b 
        . b b d d b . . . . b d d d b . 
        . b d d d d b . b b 3 d d 3 b . 
        . . b d d 3 3 b d 3 3 b b b . . 
        . . . b b b d d d d d b . . . . 
        . . . . . . b b b b b . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    100,
    false
    )
    sprite.unfollow()
    sprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    scene.cameraShake(4, 500)
    info.changeScoreBy(-5)
    info.changeLifeBy(-1)
    spawnEvilDucks(1)
    grantInvincibility()
    pause(1000)
    sprites.destroy(otherSprite)
})
let clampedValue = 0
let spriteOffset = 0
let distance_to_nearest_bad_guy = 0
let col = 0
let row = 0
let lewis_right_norm: Image[] = []
let lewis_left_norm: Image[] = []
let lewis_left_boost: Image[] = []
let lewis_right_boost: Image[] = []
let canDoubleJump = false
let jumping = false
let playerY = 0
let playerX = 0
let y = 0
let x = 0
let lewis_right_anim: Image[] = []
let nearest_bad_guy: Sprite = null
let projectile: Sprite = null
let index = 0
let allBadGuys: Sprite[] = []
let lewis_left_anim: Image[] = []
let preferredY = 0
let preferredX = 0
let coin: Sprite = null
let yEnd = 0
let logo: Image = null
let subtitle: Sprite = null
let guiDuck2: Sprite = null
let guiDuck1: Sprite = null
let title2: Sprite = null
let title1: Sprite = null
let buttonPrompt: Sprite = null
let version: Sprite = null
let lastDirection = 0
let lewis: Sprite = null
let vector: number[] = []
let dy = 0
let vy = 0
let dx = 0
let vx = 0
let speed = 0
let distance = 0
let y2 = 0
let x2 = 0
let y1 = 0
let x1 = 0
let gameStart = false
let shootRate = 0
let cooldown = 0
let level = 0
showTitleScreen()
music.play(music.createSong(hex`000e010408ff0100001c00010a006400f401640000040000000000000000000000000005000004d25d00000400012000001000011410002000010210002000010410001400012310002000011720002400012820003000011c30004000010230004000010434003800012734003800011b38003c00012338003c00011740004400012540005000011950006000010250006000010454005800012054005800011458005c00011e58005c00011260006400012060007000011470008000010270008000010478007c00011e78007c00011280008400011c80008400011084008800011c84008800011088008c00011c88008c0001109000a00001029000a000010490009400011e90009400011298009c00012098009c000114a000a400011ea000b0000112b000c0000102b000c0000104b800bc000117b800bc00010bc000c400011cc000c4000110c400c800011cc400c8000110c800cc00011cc800cc000110d000e0000102d000e0000104d000d400011ed000d4000112d800dc000120d800dc000114e000e400011ee000e4000112e800ec000128e800ec00011cf00000010102f00000010104f000f2000127f000f200011bf200f5000128f200f500011cf500f8000127f500f800011bf800fc000123f800fc00011700010401012000011001011410012001010210012001010410011401012310012001011720012401012820013001011c30014001010230014001010434013801012734013801011b38013c01012338013c01011740014401012540015001011950016001010250016001010454015801012854015801012054015801011458015c01012758015c01011e58015c01011260016401012860016401012060017001011470018001010270018001010478017c01011e78017c01011280018401011c80018401011084018801011c84018801011088018c01011c88018c0101109001a00101029001a001010490019401011e90019401011298019c01012098019c010114a001a401011ea001b0010112b001c0010102b001c0010104b801bc010123b801bc010117c001c4010123c001c4010117c401c8010123c401c8010117c801cc010123c801cc010117d001e0010102d001e0010104d001d4010121d001d8010115d801dc010120d801e0010114e001e401011ee001e4010112e801ec010128e801f001011cf00100020102f00100020104f001f4010127f001f401011ef001f8010112f801fc010128f801fc01011cf8010002011000020202011c00020402012000021002011400021002012000023002011408020a0201170c020e02011c10022002010210022002010410021402012310022002012310022002011710023002011914021602011c18021a02011720022202011c20022402012820023002012820023002011c20023002011c28022a0201172c022e02011c30024002010230024002010430023802011930023802011c34023602011c34023802012734023802012734023802011b38023a02011738023c02012338023c02012338023c02011738024002011b38024002012040024202012040024402012540025002012540025002011940025402011940025402011e48024a02011c4c024e02011c50026002010250026002010454025602011c54025802012054025802012054025802011454025802011954025802011e58025a02011758025c02011e58025c02011e58025c02011258025c02011758025c02011c5c02600201145c026002011b60026202012060027002012060027002011460027802011460027802011968026a02011c6c026e02011c70028002010270028002010474027602011c78027a02011778027c02011e78027c02011e78027c02011278028002011278028002011780028202011780028402011c80028402011c80028402011080029002011980029002011780029002011c84028802011c84028802011c84028802011088028a02011488028c02011c88028c02011c88028c0201108c028e0201179002a00201029002a002010490029402011e90029402011e90029402011290029802011990029802011b90029802011e94029602011498029a02011298029c02012098029c02012098029c0201149802a00201199802a002011c9802a0020120a002a2020114a002a402011ea002b002011ea002b0020112a002b0020119a002b002011ba002b002011ea802aa020117ac02ae020119b002c0020102b002c0020104b002c0020112b002c0020114b002c0020117b402b6020112b802ba020112b802bc020117b802bc020117b802bc02010bbc02be020114c002c2020114c002c402011cc002c402011cc002c4020110c002d0020112c002d0020110c002d0020114c402c802011cc402c802011cc402c8020110c602c8020117c802cc02011cc802cc02011cc802cc020110cc02ce020119d002e0020102d002e0020104d002d2020117d002d402011ed002d402011ed002d4020112d002d8020112d802da020123d802dc020120d802dc020120d802dc020114d802e0020114dc02de020125e002e402011ee002e402011ee002e4020112e002f0020112e402e6020128e802ea02012ae802ec020128e802ec020128e802ec02011cec02ee020125f00200030102f00200030104f002f202012cf002f2020127f002f2020127f002f202011bf00200030110f00200030117f00200030114f202f5020128f202f5020128f202f502011cf502f8020127f502f8020127f502f802011bf802fa02012ff802fc020123f802fc020123f802fc02011700030203011c00030403012000031003012000031003011400033003011408030a0301170c030e03011c10032003010210032003010410031403012310032003012310032003011710033003011914031603011c18031a03011720032203011c20032403012820033003012820033003011c20033003011c28032a0301172c032e03011c30034003010230034003010430033803011930033803011c34033603011c34033803012734033803012734033803011b38033a03011738033c03012338033c03012338033c03011738034003011b38034003012040034203012040034403012540035003012540035003011940035403011940035403011e48034a03011c4c034e03011c50036003010250036003010454035603011c54035803012854035803012054035803012054035803011454035803011954035803011e58035a03011758035c03012758035c03011e58035c03011e58035c03011258035c03011758035c03011c5c03600301145c036003011b60036203012060036403012860037003012060037003011460037803011460037803011968036a03011c6c036e03011c70038003010270038003010474037603011c78037a03011778037c03011e78037c03011e78037c03011278038003011278038003011780038203011780038403011c80038403011c80038403011080039003011980039003011780039003011c84038803011c84038803011c84038803011088038a03011488038c03011c88038c03011c88038c0301108c038e0301179003a00301029003a003010490039403011e90039403011e90039403011290039803011990039803011b90039803011e94039603011498039a03011298039c03012098039c03012098039c0301149803a00301199803a003011c9803a0030120a003a2030114a003a403011ea003b003011ea003b0030112a003b0030119a003b003011ba003b003011ea803aa030117ac03ae030119b003c0030102b003c0030104b003c0030117b003c0030114b003c0030112b403b6030112b803ba030112b803bc030123b803bc030123b803bc030117bc03be030114c003c2030114c003c4030123c003c4030123c003c4030117c003d0030112c003d0030110c003d0030114c403c8030123c403c8030123c403c8030117c603c8030117c803cc030123c803cc030123c803cc030117cc03ce030119d003e0030102d003e0030104d003d2030117d003d4030121d003d8030121d003d8030115d003d8030112d803da030123d803dc030120d803e0030120d803e0030114d803e0030114dc03de030125e003e403011ee003e403011ee003e4030112e003f0030112e403e6030128e803ea03012ae803ec030128e803f0030128e803f003011cec03ee030125f00300040102f00300040104f003f203012cf003f4030127f003f403011ef003f803011ef003f8030112f00300040110f00300040117f00300040114f803fa03012ff803fc030128f803fc03011cf8030004011cf8030004011000041c04012000040404010d1004140401141c042004012120043004012020042404011930043804011e30043404011738044004011c40044404010d48044c04012050045c0401205c046004012160047004012060046404010d70047804011e70047404011078048004011c80049c04011e80048404010f9004940401129c04a0040120a004b0040117a004a4040119b004c004011bb004b4040117c004dc04011cc004c404010dd004d4040112dc04e004011ee004f004011ce004e4040114f004f404011700051c05012000050405010d1005140501141c052005012120053005012020052405011930053805011e30053405011738054005011c40054405010d48054c05012050055c0501205c056005012160057005012060056405010d70057805011e70057405011078058005011c80059c05011e80058405010f9005940501129c05a0050120a005b0050123a005a405010fb005c0050121b005b4050117c005d0050120c005c405010dd005d805011ed005d405010bd805e005011cd805dc05010be005f005011be005e4050108f005f805011cf005f405010bf8050006011ef80500060102f8050006010400061c06011c00061c06012000064006011400064006011900060406010d1006140601141c062006011e1c062006012120063006011c20063006012020062406011930063806011b30063806011e30063406011738064006011938064006011c40068006011740068006011c40064406010d48064c06011c48064c06012050065c06011c50065c0601205c066006011e5c066006012160067006011c60067006012060066406010d70067806011b70067806011e70067406011078068006011978068006011c80069c06011b80069c06011e8006c00601178006c006011b80068406010f9006940601129c06a006011c9c06a0060120a006b0060114a006b0060117a006a4060119b006c0060117b006c006011bb006b4060117c006dc060119c006dc06011cc006f0060117c006f006011cc006c406010dd006d4060112dc06e006011bdc06e006011ee006f0060119e006f006011ce006e4060114f00600070117f0060007011bf006f406011700071c07011c00071c07012000074007011400074007011900070407010d1007140701141c072007011e1c072007012120073007011c20073007012020072407011930073807011b30073807011e30073407011738074007011938074007011c40078007011740078007011c40074407010d48074c07011c48074c07012050075c07011c50075c0701205c076007011e5c076007012160077007011c60077007012060076407010d70077807011b70077807011e70077407011078078007011978078007011c80079007011e8007900701238007c00701178007c007011b80078207012380078407010f90079807011e9007980701219007920701239007940701129807a007011b9807a0070120a007b007011ba007b007011ea007a2070123a007a407010fb007b8070117b007b807011eb007b2070123b007b4070117b807c0070117b807c007011bc007c4070112c007c4070117c007c407010bc407c8070112c407c8070117c407c807010bc807cc070112c807cc070117c807cc07010bd007d4070117d007d407011bd007d407010fd807e007011bd807e007011ed807dc070112e0070008011ee00700080123e007e4070117f80700080102f8070008010400083008011c00080408013d00083008012800083008011000080408010d04080808013d08080c08010d10082008010210082008010410081408013b10081408011218081c08013818081c0801121c08200801381c082008011424082808011428082c08013430084008010230084008010430083408011c30083408013630083408012830083408011030083408011734083808011e34083808012a34083808011238083c08011c38083c08013138083c08012838083c08011038083c0801143c084008011b3c08400801273c084008010f40087008011c40084408013d40087008012840087008011040084408010d44084808013d48084c08010d50086008010250086008010450085408013b50085408011258085c08013858085c0801125c08600801385c086008011464086808011468086c08013470088008010270088008010470087408012070087408013670087408012c70087408011470087408011774087808012174087808012d74087808011578087c08012078087c08013178087c08012c78087c08011478087c0801147c088008011e7c088008012a7c08800801128008a808012080088408013d8008a808012c8008a808011480088408011084088808013d88088c0801109008a00801029008a008010490089408013b90089408011798089c08013898089c0801179c08a00801389c08a008011ca408a808011ca808b008011ca808ac080134a808b0080128a808b0080110b008c0080102b008c0080104b008b8080117b008b4080136b008b8080123b008b808010bb008b408011eb808c008011cb808bc080131b808c0080128b808c0080110b808bc08011cc008cc080120c008c408013dc008cc08012cc008cc080114c008c4080114c408c808013dcc08d8080121cc08d808012dcc08d8080115d008e0080102d008e0080104d008d408013bd008d4080114d808e0080123d808dc080138d808e008012fd808e0080117d808dc080114dc08e0080138e008f008011ee008f008012ae008f0080112e008e4080112e808ec080134e808ec080114f00800090102f00800090104f0080009011cf008f4080136f00800090128f00800090110f008f4080112f808fc080131f808fc08011000093009011c00090409013d00093009012800093009011000090409010d04090809013d08090c09010d10092009010210092009010410091409013b10091409011218091c09013818091c0901121c09200901381c092009011424092809011428092c09013430094009010230094009010430093409011c30093409013630093409012830093409011030093409011734093809011e34093809012a34093809011238093c09011c38093c09013138093c09012838093c09011038093c0901143c094009011b3c09400901273c094009010f40097009011c40094409013d40097009012840097009011040094409010d44094809013d48094c09010d50096009010250096009010450095409013b50095409011258095c09013858095c0901125c09600901385c096009011464096809011468096c09013470098009010270098009010470097409011c70097409013670097409012870097409011070097409011774097809011e74097809012a74097809011278098009012078097c09013178098009012c78098009011478097c0901148009a809012080098409013d8009a809012c8009a809011480098409011084098809013d88098c0901109009a00901029009a009010490099409013b90099409011798099c09013898099c0901179c09a00901389c09a009011ca409a809011ca809b009011ca809ac090134a809b0090128a809b0090110b009c0090102b009c0090104b009b8090117b009b4090136b009b8090123b009b809010bb009b409011eb809c009011cb809bc090131b809c0090128b809c0090110b809bc09011cc009cc090120c009c409013dc009cc09012cc009cc090114c009c409011cc409c809013dcc09d8090121cc09d809012dcc09d8090115cc09d009011ed009e0090102d009e0090104d009d409013bd809e0090123d809dc090138d809e009012fd809e0090117d809dc090120dc09e0090138e009000a0123e009000a012fe009000a0117e009e4090120e409e8090128e809ec090134ec09f009011ef009000a0102f009000a0104f009f4090136f809fc090131f809fc09011c000a300a011c000a040a013d000a300a0125000a300a0128000a300a010d000a300a0110000a040a010d040a080a013d080a0c0a010d100a200a0102100a200a0104100a140a013b100a140a0112180a1c0a0138180a1c0a01121c0a200a01381c0a200a0114240a280a0114280a2c0a0134300a400a0102300a400a0104300a340a011c300a340a0136300a340a0125300a340a0128300a340a010d300a340a0110300a340a0117340a380a011e340a380a0127340a380a012a340a380a010f340a380a0112380a3c0a011c380a3c0a0131380a3c0a0125380a3c0a0128380a3c0a010d380a3c0a0110380a3c0a01143c0a400a011b3c0a400a01233c0a400a01273c0a400a010b3c0a400a010f400a700a011c400a440a013d400a700a0125400a700a0128400a700a010d400a700a0110400a440a010d440a480a013d480a4c0a010d500a600a0102500a600a0104500a540a013b500a540a0112580a5c0a0138580a5c0a01125c0a600a01385c0a600a0114640a680a0114680a6c0a0134700a800a0102700a800a0104700a740a0120700a740a0136700a740a0128700a740a012c700a740a0110700a740a0114700a740a0117740a780a0121740a780a012a740a780a012d740a780a0112740a780a0115780a7c0a0120780a7c0a0131780a7c0a0128780a7c0a012c780a7c0a0110780a7c0a0114780a7c0a01147c0a800a011e7c0a800a01277c0a800a012a7c0a800a010f7c0a800a0112800aa80a0120800a840a013d800aa80a0128800aa80a012c800aa80a0110800aa80a0114800a840a0110840a880a013d880a8c0a0110900aa00a0102900aa00a0104900a940a013b900a940a0117980a9c0a0138980a9c0a01179c0aa00a01389c0aa00a011ca40aa80a011ca80ab00a011ca80aac0a0134a80ab00a0125a80ab00a0128a80ab00a0110a80ab00a010db00ac00a0102b00ac00a0104b00ab80a0117b00ab40a0136b00ab80a011eb00ab80a0123b00ab80a0106b00ab80a010bb00ab40a011eb80ac00a011cb80abc0a0131b80ac00a0125b80ac00a0128b80ac00a010db80ac00a0110b80abc0a011cc00acc0a0120c00ac40a013dc00acc0a0128c00acc0a012cc00acc0a0110c00acc0a0114c00ac40a0114c40ac80a013dcc0ad80a0121cc0ad80a012acc0ad80a012dcc0ad80a0112cc0ad80a0115d00ae00a0102d00ae00a0104d00ad40a013bd00ad40a0114d80ae00a0123d80adc0a0138d80ae00a012cd80ae00a012fd80ae00a0114d80ae00a0117d80adc0a0114dc0ae00a0138e00af00a011ee00af00a0127e00af00a012ae00af00a010fe00af00a0112e00ae40a0112e80aec0a0134e80aec0a0114f00a000b0102f00a000b0104f00a000b011cf00af40a0136f00a000b0125f00a000b0128f00a000b010df00a000b0110f00af40a0112f80afc0a0131f80afc0a0110000b300b011c000b040b013d000b300b0125000b300b0128000b300b010d000b300b0110000b040b010d040b080b013d080b0c0b010d100b200b0102100b200b0104100b140b013b100b140b0112180b1c0b0138180b1c0b01121c0b200b01381c0b200b0114240b280b0114280b2c0b0134300b400b0102300b400b0104300b340b011c300b340b0136300b340b0125300b340b0128300b340b010d300b340b0110300b340b0117340b380b011e340b380b0127340b380b012a340b380b010f340b380b0112380b3c0b011c380b3c0b0131380b3c0b0125380b3c0b0128380b3c0b010d380b3c0b0110380b3c0b01143c0b400b011b3c0b400b01233c0b400b01273c0b400b010b3c0b400b010f400b700b011c400b440b013d400b700b0125400b700b0128400b700b010d400b700b0110400b440b010d440b480b013d480b4c0b010d500b600b0102500b600b0104500b540b013b500b540b0112580b5c0b0138580b5c0b01125c0b600b01385c0b600b0114640b680b0114680b6c0b0134700b800b0102700b800b0104700b740b011c700b740b0136700b740b0125700b740b0128700b740b0112700b740b0117700b740b0117740b780b011e740b780b0127740b780b012a740b780b0114740b780b0119780b800b0120780b7c0b0131780b800b0128780b800b012c780b7c0b0115780b7c0b011b780b7c0b01147c0b800b01177c0b800b011c800bb00b0120800b840b013d800bb00b0128800bb00b012c800bb00b0117800bb00b011c800b840b0110840b880b013d880b8c0b0110900ba00b0102900ba00b0104900b940b013b900b940b0117980b9c0b0138980b9c0b01179c0ba00b01389c0ba00b011ca40ba80b011ca80bac0b0134b00bc00b0102b00bc00b0104b00bb80b011eb00bb40b0136b00bb80b0127b00bb80b012ab00bb80b010fb00bb80b0112b00bb40b011eb80bc00b011cb80bbc0b0131b80bc00b0125b80bc00b0128b80bc00b010db80bc00b0110b80bbc0b011cc00bc40b011bc00bc40b013dc00bc40b0123c00bc40b0127c00bc40b010bc00bc40b010fc00bc40b011cc40bc80b011cc40bc80b013dc40bc80b0125c40bc80b0128c40bc80b010dc40bc80b0110c80bd00b011bc80bd00b0123c80bd00b0127c80bd00b010bc80bd00b010fcc0bd00b011ed00be00b0102d00be00b0104d00bd80b011cd00bd40b013bd00bd80b0125d00bd80b0128d00bd80b010dd00bd80b0110d80be00b011ed80bdc0b0138d80be00b0127d80be00b012ad80be00b010fd80be00b0112d80bdc0b0120dc0be00b0138e00bf00b0117e00bf00b011ee00bf00b0123e00bf00b0106e00bf00b010be00be40b0120e40be80b0128e80bec0b0134ec0bf00b011ef00b000c0102f00b000c0104f00b000c011bf00bf40b0136f00b000c0123f00b000c0127f00b000c010bf00b000c010ff80bfc0b0131f80bfc0b011c000c020c0125040c060c0125080c0c0c0117080c0a0c01230c0c100c01170c0c0e0c0120100c120c0123180c1a0c01231c0c1e0c011c200c240c0117200c220c011e280c2a0c011e300c320c011e380c3c0c01173c0c3e0c011c400c420c011e480c4c0c0117480c4a0c011e4c0c500c0117500c520c011e580c5a0c011e5c0c5e0c011c600c640c0117600c620c011e640c660c011e680c6a0c0120700c740c0117700c720c0119800c820c0125840c860c0125880c8c0c0117880c8a0c01238c0c900c01178c0c8e0c0120900c920c0123980c9a0c01239c0c9e0c011ca00ca40c0117a00ca20c011ea80caa0c011eb00cb20c011eb80cbc0c0117bc0cbe0c011cc00cc20c011ec80ccc0c0117c80cca0c011ecc0cd00c0117cc0cce0c011cd00cd20c011ed80cda0c011edc0cde0c011ce00ce40c0117e00ce20c011ee40ce60c011ee80cea0c0120f00cf40c0117f00cf20c0119000d040d010d000d040d0119000d020d0125040d080d010d040d080d0119040d060d0125080d0c0d0117080d0c0d010b080d0c0d0117080d0a0d01230c0d100d01170c0d100d01080c0d100d01140c0d0e0d0120100d140d010b100d140d0117100d120d0123180d1c0d0108180d1c0d0114180d1a0d01201c0d200d01041c0d200d01101c0d1e0d011c200d240d0117200d240d0106200d240d0112200d220d011e280d2c0d0106280d2c0d0112280d2a0d011e300d340d0106300d340d0112300d320d011e380d3c0d01173c0d400d01043c0d400d01103c0d3e0d011c400d440d0106400d440d0112400d420d011e480d4c0d0117480d4c0d0104480d4c0d0110480d4a0d011c4c0d500d0117500d540d0106500d540d0112500d520d011e580d5c0d0106580d5c0d0112580d5a0d011e5c0d600d01045c0d600d01105c0d5e0d011c600d640d0117600d640d0106600d640d0112600d620d011e640d680d0106640d680d0112640d660d011e680d6c0d0108680d6c0d0114680d6a0d0120700d740d0117700d740d0101700d740d010d700d720d0119800d840d010d800d840d0119800d820d0125840d880d010d840d880d0119840d860d0125880d8c0d0117880d8c0d010b880d8c0d0117880d8a0d01238c0d900d01178c0d900d01088c0d900d01148c0d8e0d0120900d940d010b900d940d0117900d920d0123980d9c0d010b980d9c0d0117980d9a0d01239c0da00d01049c0da00d01109c0d9e0d011ca00da40d0117a00da40d0106a00da40d0112a00da20d011ea80dac0d0106a80dac0d0112a80daa0d011eb00db40d0106b00db40d0112b00db20d011eb80dbc0d0117b80dbc0d0106b80dbc0d0112bc0dc00d0104bc0dc00d0110bc0dbe0d011cc00dc40d0106c00dc40d0112c00dc20d011ec40dc80d0106c40dc80d0112c40dc60d011ec80dcc0d0117c80dcc0d0104c80dcc0d0110c80dca0d011ccc0dd00d0117cc0dd00d0104cc0dd00d0110cc0dce0d011cd00dd40d0106d00dd40d0112d00dd20d011ed80ddc0d0106d80ddc0d0112d80dda0d011edc0de00d0104dc0de00d0110dc0dde0d011ce00de40d0117e00de40d0106e00de40d0112e00de20d011ee40de80d0106e40de80d0112e40de60d011ee80dec0d0108e80dec0d0114e80dea0d0120f00df40d0117f00df40d0101f00df40d010df00df20d0119000e020e011e040e060e011e080e0a0e0120100e120e0119200e220e0112240e260e0112280e2a0e0114300e320e010d400e420e0117440e460e0117480e4a0e0117500e520e011c580e5a0e0120600e620e011e700e780e0102700e780e0104800e840e0120800e900e0114900ea00e0102900ea00e0104900e940e0123900ea00e0117a00ea40e0128a00eb00e011cb00ec00e0102b00ec00e0104b40eb80e0127b40eb80e011bb80ebc0e0123b80ebc0e0117c00ec40e0125c00ed00e0119d00ee00e0102d00ee00e0104d40ed80e0120d40ed80e0114d80edc0e011ed80edc0e0112e00ee40e0120e00ef00e0114f00e000f0102f00e000f0104f80efc0e011ef80efc0e0112000f040f011c000f040f0110040f080f011c040f080f0110080f0c0f011c080f0c0f0110100f200f0102100f200f0104100f140f011e100f140f0112180f1c0f0120180f1c0f0114200f240f011e200f300f0112300f400f0102300f400f0104380f3c0f0117380f3c0f010b400f440f011c400f440f0110440f480f011c440f480f0110480f4c0f011c480f4c0f0110500f600f0102500f600f0104500f540f011e500f540f0112580f5c0f0120580f5c0f0114600f640f011e600f640f0112680f6c0f0128680f6c0f011c700f800f0102700f800f0104700f720f0127700f720f011b720f750f0128720f750f011c750f780f0127750f780f011b780f7c0f0123780f7c0f0117800f840f0120800f900f0114900fa00f0102900fa00f0104900f940f0123900fa00f0117a00fa40f0128a00fb00f011cb00fc00f0102b00fc00f0104b40fb80f0127b40fb80f011bb80fbc0f0123b80fbc0f0117c00fc40f0125c00fd00f0119d00fe00f0102d00fe00f0104d40fd80f0128d40fd80f0120d40fd80f0114d80fdc0f0127d80fdc0f011ed80fdc0f0112e00fe40f0128e00fe40f0120e00ff00f0114f00f00100102f00f00100104f80ffc0f011ef80ffc0f011200100410011c00100410011004100810011c04100810011008100c10011c08100c10011010102010010210102010010410101410011e10101410011218101c10012018101c10011420102410011e20103010011230104010010230104010010438103c10012338103c10011740104410012340104410011744104810012344104810011748104c10012348104c10011750106010010250106010010450105410012150105810011558105c10012058106010011460106410011e60106410011268106c10012868107010011c70108010010270108010010470107410012770107410011e70107810011278107c10012878107c10011c78108010011080108210011c8010841001208010901001148010901001208010b010011488108a1001178c108e10011c9010a01001029010a01001049010941001239010a01001239010a01001179010b010011994109610011c98109a100117a010a210011ca010a4100128a010b0100128a010b010011ca010b010011ca810aa100117ac10ae10011cb010c0100102b010c0100104b010b8100119b010b810011cb410b610011cb410b8100127b410b8100127b410b810011bb810ba100117b810bc100123b810bc100123b810bc100117b810c010011bb810c0100120c010c2100120c010c4100125c010d0100125c010d0100119c010d4100119c010d410011ec810ca10011ccc10ce10011cd010e0100102d010e0100104d410d610011cd410d8100120d410d8100120d410d8100114d410d8100119d410d810011ed810da100117d810dc10011ed810dc10011ed810dc100112d810dc100117d810dc10011cdc10e0100114dc10e010011be010e2100120e010f0100120e010f0100114e010f8100114e010f8100119e810ea10011cec10ee10011cf01000110102f01000110104f410f610011cf810fa100117f810fc10011ef810fc10011ef810fc100112f81000110112f8100011011700110211011700110411011c00110411011c00110411011000111011011900111011011700111011011c04110811011c04110811011c04110811011008110a11011408110c11011c08110c11011c08110c1101100c110e11011710112011010210112011010410111411011e10111411011e10111411011210111811011910111811011b10111811011e14111611011418111a11011218111c11012018111c11012018111c11011418112011011918112011011c18112011012020112211011420112411011e20113011011e20113011011220113011011920113011011b20113011011e28112a1101172c112e11011930114011010230114011010430114011011230114011011430114011011734113611011238113a11011238113c11011738113c11011738113c11010b3c113e11011440114211011440114411011c40114411011c40114411011040115011011240115011011040115011011444114811011c44114811011c44114811011046114811011748114c11011c48114c11011c48114c1101104c114e11011950116011010250116011010450115211011750115411011e50115411011e50115411011250115811011258115a11012358115c11012058115c11012058115c1101145811601101145c115e11012560116411011e60116411011e60116411011260117011011264116611012868116a11012a68116c11012868116c11012868116c11011c6c116e11012570118011010270118011010470117211012c70117211012770117211012770117211011b70118011011070118011011770118011011472117511012872117511012872117511011c75117811012775117811012775117811011b78117a11012f78117c11012378117c11012378117c11011780118211011c8011841101208011901101208011901101148011b011011488118a1101178c118e11011c9011a01101029011a01101049011941101239011a01101239011a01101179011b011011994119611011c98119a110117a011a211011ca011a4110128a011b0110128a011b011011ca011b011011ca811aa110117ac11ae11011cb011c0110102b011c0110104b011b8110119b011b811011cb411b611011cb411b8110127b411b8110127b411b811011bb811ba110117b811bc110123b811bc110123b811bc110117b811c011011bb811c0110120c011c2110120c011c4110125c011d0110125c011d0110119c011d4110119c011d411011ec811ca11011ccc11ce11011cd011e0110102d011e0110104d411d611011cd411d8110128d411d8110120d411d8110120d411d8110114d411d8110119d411d811011ed811da110117d811dc110127d811dc11011ed811dc11011ed811dc110112d811dc110117d811dc11011cdc11e0110114dc11e011011be011e2110120e011e4110128e011f0110120e011f0110114e011f8110114e011f8110119e811ea11011cec11ee11011cf01100120102f01100120104f411f611011cf811fa110117f811fc11011ef811fc11011ef811fc110112f81100120112f8110012011700120212011700120412011c00120412011c00120412011000121012011900121012011700121012011c04120812011c04120812011c04120812011008120a12011408120c12011c08120c12011c08120c1201100c120e12011710122012010210122012010410121412011e10121412011e10121412011210121812011910121812011b10121812011e14121612011418121a12011218121c12012018121c12012018121c12011418122012011918122012011c18122012012020122212011420122412011e20123012011e20123012011220123012011920123012011b20123012011e28122a1201172c122e12011930124012010230124012010430124012011730124012011430124012011234123612011238123a12011238123c12012338123c12012338123c1201173c123e12011440124212011440124412012340124412012340124412011740125012011240125012011040125012011444124812012344124812012344124812011746124812011748124c12012348124c12012348124c1201174c124e12011950126012010250126012010450125212011750125412012150125812012150125812011550125812011258125a12012358125c1201205812601201205812601201145812601201145c125e12012560126412011e60126412011e60126412011260127012011264126612012868126a12012a68126c12012868127012012868127012011c6c126e12012570128012010270128012010470127212012c70127412012770127412011e70127812011e70127812011270128012011070128012011770128012011478127a12012f78127c12012878127c12011c78128012011c78128012011080128212011988128a1201178c128e1201199012a01201029012a012010494129612011998129a120117a012a2120119a812aa120117ac12ae120119b012c0120102b012c0120104b412b6120119b812ba120117c012c2120120c812ca120119cc12ce120119d012e0120102d012e0120104d412d6120119d812da120117e012e2120120e812ea120119ec12ee120119f01200130102f01200130104f412f6120119f812fa12011700130213011908130a1301190a130d13011b0d131013011910132013010210132013010410131213011418131a13011720132213011928132a1301192a132d13011b2d133013011930134013010230134013010430133213011438133a13011740134213011948134a13011e4c134e13011950136013010250136013010454135613011958135a1301235c135e13012564136613012868136a13012a6c136e13012570138013010270138013010470137213012c78137a13012f80138213011988138a1301178c138e1301199013a01301029013a013010494139613011998139a130117a013a2130119a813aa130117ac13ae130119b013c0130102b013c0130104b413b6130119b813ba130117c013c2130120c813ca130119cc13ce130119d013e0130102d013e0130104d413d6130119d813da130117e013e2130123e813ea130119ec13ee130119f01300140102f01300140104f413f6130119f813fa13011700140214012508140a1401250c140e14012310142014010210142014010410141214012018141a14011e1c141e14012024142614011c28142a14011e2c142e14011930144014010230144014010430143214011c38143a14011740144214011944144614011c4c144e14011e5014601401025014601401045414561401235c145e14012564146614012068146a1401236c146e14011e70148014010270148014010470147214012074147614011c78147a14011e7c147e1401238014821401128c148e1401129014a01401029014a01401049014921401129c149e140112a014a2140112a414a6140114a814aa140112ac14ae140114b014c0140102b014c0140104b014b214011bb814ba140117c514c8140112ca14cd140112d014e0140102d014e0140104d014d2140112d514d8140114da14dd140112e014e2140112e514e8140114ea14ed140112f01400150102f01400150104f014f214011ef814fa14011b0015021501170a150d1501151015201501021015201501041015121501141a151d1501122015221501142a152d1501103015401501023015401501043015321501123a153d15011040154215010b4415461501104c154e15011250156015010250156015010458155a15011460156215011768156a15011570158015010270158015010470157215011478157a1501128015821501128c158e1501129015a01501029015a01501049015921501129c159e150112a015a2150112a415a6150114a815aa150112ac15ae150114b015c0150102b015c0150104b015b215011bb815ba150117c515c8150112ca15cd150112d015e0150102d015e0150104d015d2150112d515d8150114da15dd150112e015e2150112e515e8150114ea15ed150112f01500160102f01500160104f015f215011ef815fa15011b00160216011208160a16011210162016010210162016010410161216011214161616011418161a16011220162216011028162a16011430164016010230164016010430163216010b38163a16011040164216011248164a16010f50166016010250166016010450165216011058165a16011460166216011768166a16011270168016010270168016010470167216011478167a16011780168216011c8016901601148016901601208016b016011488168a1601178c168e16011c9016a01601029016a01601049016a01601239016a01601179016b016011994169616011c98169a160117a016a216011ca016b0160128a016b016011ca016b016011ca816aa160117ac16ae16011cb016c0160102b016c0160104b016b8160119b016b816011cb416b616011cb416b8160127b416b816011bb816ba160117b816bc160123b816bc160117b816c016011bb816c0160120c016c2160120c016d0160125c016d0160119c016d4160119c016d416011ec816ca16011ccc16ce16011cd016e0160102d016e0160104d416d616011cd416d8160120d416d8160114d416d8160119d416d816011ed816da160117d816dc16011ed816dc160112d816dc160117d816dc16011cdc16e0160114dc16e016011be016e2160120e016f0160120e016f0160114e016f8160114e016f8160119e816ea16011cec16ee16011cf01600170102f01600170104f416f616011cf816fa160117f816fc16011ef816fc160112f81600170112f8160017011700170217011700170417011c00170417011000171017011900171017011700171017011c04170817011c04170817011008170a17011408170c17011c08170c1701100c170e17011710172017010210172017010410171417011e10171417011210171817011910171817011b10171817011e14171617011418171a17011218171c17012018171c17011418172017011918172017011c18172017012020172217011420173017011e20173017011220173017011920173017011b20173017011e28172a1701172c172e17011930174017010230174017010430174017011230174017011430174017011734173617011238173a17011238173c17011738173c17010b3c173e17011440174217011440174417011c40174417011040175017011240175017011040175017011444174817011c44174817011046174817011748174c17011c48174c1701104c174e17011950176017010250176017010450175217011750175417011e50175417011250175817011258175a17012358175c17012058175c1701145817601701145c175e17012560176417011e60176417011260177017011264176617012868176a17012a68176c17012868176c17011c6c176e17012570178017010270178017010470177217012c70177217012770177217011b70178017011070178017011770178017011472177517012872177517011c75177817012775177817011b78177a17012f78177c17012378177c17011780178217011c8017901701208017901701148017b017011488178a1701178c178e17011c9017a01701029017a01701049017a01701239017a01701179017b017011994179617011c98179a170117a017a217011ca017b0170128a017b017011ca017b017011ca817aa170117ac17ae17011cb017c0170102b017c0170104b017b8170119b017b817011cb417b617011cb417b8170127b417b817011bb817ba170117b817bc170123b817bc170117b817c017011bb817c0170120c017c2170120c017d0170125c017d0170119c017d4170119c017d417011ec817ca17011ccc17ce17011cd017e0170102d017e0170104d417d617011cd417d8170120d417d8170114d417d8170119d417d817011ed817da170117d817dc17011ed817dc170112d817dc170117d817dc17011cdc17e0170114dc17e017011be017e2170120e017f0170120e017f0170114e017f8170114e017f8170119e817ea17011cec17ee17011cf01700180102f01700180104f417f617011cf817fa170117f817fc17011ef817fc170112f81700180112f8170018011700180218011700180418011c00180418011000181018011900181018011700181018011c04180818011c04180818011008180a18011408180c18011c08180c1801100c180e18011710182018010210182018010410181418011e10181418011210181818011910181818011b10181818011e14181618011418181a18011218181c18012018181c18011418182018011918182018011c18182018012020182218011420183018011e20183018011220183018011920183018011b20183018011e28182a1801172c182e18011930184018010230184018010430184018011730184018011430184018011234183618011238183a18011238183c18012338183c1801173c183e18011440184218011440184418012340184418011740185018011240185018011040185018011444184818012344184818011746184818011748184c18012348184c1801174c184e18011950186018010250186018010450185218011750185818012150185818011550185818011258185a1801235818601801205818601801145818601801145c185e18012560186418011e60186418011260187018011264186618012868186a18012a68187018012868187018011c6c186e18012570188018010270188018010470187218012c70187818011e70187818011270188018011070188018011770188018011478187a18012f78188018011c78188018011080188218011c8018901801088018901801148018901801208018b018011488188a1801178c188e18011c9018a01801029018a01801049018a018010b9018a01801239018a01801179018b018011994189618011c98189a180117a018a218011ca018b0180110a018b0180128a018b018011ca018b018011ca818aa180117ac18ae18011cb018c0180102b018c0180104b018b8180119b018b818011cb418b618011cb418b818010fb418b8180127b418b818011bb818ba180117b818bc18010bb818bc180123b818bc180117b818c018011bb818c0180120c018c2180120c018d018010dc018d0180125c018d0180119c018d4180119c018d418011ec818ca18011ccc18ce18011cd018e0180102d018e0180104d418d618011cd418d8180108d418d8180120d418d8180114d418d8180119d418d818011ed818da180117d818dc180106d818dc18011ed818dc180112d818dc180117d818dc18011cdc18e0180114dc18e018011be018e2180120e018f0180108e018f0180120e018f0180114e018f8180114e018f8180119e818ea18011cec18ee18011cf01800190102f01800190104f418f618011cf818fa180117f818fc180106f818fc18011ef818fc180112f81800190112f8180019011700190219011700190419010400190419011c00190419011000191019011900191019011700191019011c04190819010404190819011c04190819011008190a19011408190c19010408190c19011c08190c1901100c190e19011710192019010210192019010410191419010610191419011e10191419011210191819011910191819011b10191819011e14191619011418191a19011218191c19010818191c19012018191c19011418192019011918192019011c18192019012020192219011420193019010620193019011e20193019011220193019011920193019011b20193019011e28192a1901172c192e19011930194019010230194019010430194019011230194019011430194019011734193619011238193a19011238193c19010b38193c19013f38193c1901173c193e19011440194219011440194419010440194419011c40194419011040195019011240195019011040195019011444194819010444194819011c44194819011046194819011748194c19010448194c19011c48194c1901104c194e19011950196019010250196019010450195219011750195419010650195419011e50195419011250195819011258195a19012358195c19010858195c19012058195c1901145819601901145c195e19012560196419010660196419011e60196419011260197019011264196619012868196a19012a68196c19011068196c19012868196c19011c6c196e19012570198019010270198019010470197219012c70197219010f70197219012770197219011b70198019011070198019011770198019011472197519011072197519012872197519011c75197819010f75197819012775197819011b78197a19012f78197c19010b78197c19012378197c19011780198219011c8019901901088019901901208019901901148019b019011488198a1901178c198e19011c9019a01901029019a01901049019a019010b9019a01901239019a01901179019b019011994199619011c98199a190117a019a219011ca019b0190110a019b0190128a019b019011ca019b019011ca819aa190117ac19ae19011cb019c0190102b019c0190104b019b8190119b019b819011cb419b619011cb419b819010fb419b8190127b419b819011bb819ba190117b819bc19010bb819bc190123b819bc190117b819c019011bb819c0190120c019c2190120c019d019010dc019d0190125c019d0190119c019d4190119c019d419011ec819ca19011ccc19ce19011cd019e0190102d019e0190104d419d619011cd419d8190108d419d8190120d419d8190114d419d8190119d419d819011ed819da190117d819dc190106d819dc19011ed819dc190112d819dc190117d819dc19011cdc19e0190114dc19e019011be019e2190120e019f0190108e019f0190120e019f0190114e019f8190114e019f8190119e819ea19011cec19ee19011cf019001a0102f019001a0104f419f619011cf819fa190117f819fc190106f819fc19011ef819fc190112f819001a0112f819001a0117001a021a0117001a041a0104001a041a011c001a041a0110001a101a0119001a101a0117001a101a011c041a081a0104041a081a011c041a081a0110081a0a1a0114081a0c1a0104081a0c1a011c081a0c1a01100c1a0e1a0117101a201a0102101a201a0104101a141a0106101a141a011e101a141a0112101a181a0119101a181a011b101a181a011e141a161a0114181a1a1a0112181a1c1a0108181a1c1a0120181a1c1a0114181a201a0119181a201a011c181a201a0120201a221a0114201a301a0106201a301a011e201a301a0112201a301a0119201a301a011b201a301a011e281a2a1a01172c1a2e1a0119301a401a0102301a401a0104301a401a0117301a401a0114301a401a0112341a361a0112381a3a1a0112381a3c1a010b381a3c1a0123381a3c1a01173c1a3e1a0114401a421a0114401a441a010b401a441a0123401a441a0117401a501a0112401a501a0110401a501a0114441a481a010b441a481a0123441a481a0117461a481a0117481a4c1a010b481a4c1a0123481a4c1a01174c1a4e1a0119501a601a0102501a601a0104501a521a0117501a581a0109501a581a0121501a581a0115501a581a0112581a5a1a0123581a601a0108581a601a0120581a601a0114581a601a01145c1a5e1a0125601a641a0106601a641a011e601a641a0112601a701a0112641a661a0128681a6a1a012a681a701a0110681a701a0128681a701a011c6c1a6e1a0125701a801a0102701a801a0104701a721a012c701a781a0106701a781a011e701a781a0112701a801a0110701a801a0117701a801a0114781a7a1a012f781a801a0104781a801a011c781a801a0110801a9c1a0120801a841a010d901a941a01149c1aa01a0121a01ab01a0120a01aa41a0119b01ab81a011eb01ab41a0117b81ac01a011cc01ac41a010dc81acc1a0120d01adc1a0120dc1ae01a0121e01af01a0120e01ae41a010df01af81a011ef01af41a0110f81a001b011c001b1c1b011e001b041b010f101b141b01121c1b201b0120201b301b0117201b241b0119301b401b011b301b341b0117401b5c1b011c401b441b010d501b541b01125c1b601b011e601b701b011c601b641b0114701b741b0117801b9c1b0120801b841b010d901b941b01149c1ba01b0121a01bb01b0120a01ba41b0119b01bb81b011eb01bb41b0117b81bc01b011cc01bc41b010dc81bcc1b0120d01bdc1b0120dc1be01b0121e01bf01b0120e01be41b010df01bf81b011ef01bf41b0110f81b001c011c001c1c1c011e001c041c010f101c141c01121c1c201c0120201c301c0123201c241c010f301c401c0121301c341c0117401c501c0120401c441c010d501c581c011e501c541c010b581c601c011c581c5c1c010b601c701c011b601c641c0108701c781c011c701c741c010b781c801c011e781c801c0102781c801c0104801c9c1c011c801c9c1c0120801cc01c0114801cc01c0119801c841c010d901c941c01149c1ca01c011e9c1ca01c0121a01cb01c011ca01cb01c0120a01ca41c0119b01cb81c011bb01cb81c011eb01cb41c0117b81cc01c0119b81cc01c011cc01c001d0117c01c001d011cc01cc41c010dc81ccc1c011cc81ccc1c0120d01cdc1c011cd01cdc1c0120dc1ce01c011edc1ce01c0121e01cf01c011ce01cf01c0120e01ce41c010df01cf81c011bf01cf81c011ef01cf41c0110f81c001d0119f81c001d011c001d1c1d011b001d1c1d011e001d401d0117001d401d011b001d041d010f101d141d01121c1d201d011c1c1d201d0120201d301d0114201d301d0117201d241d0119301d401d0117301d401d011b301d341d0117401d5c1d0119401d5c1d011c401d701d0117401d701d011c401d441d010d501d541d01125c1d601d011b5c1d601d011e601d701d0119601d701d011c601d641d0114701d801d0117701d801d011b701d741d0117801d9c1d011c801d9c1d0120801dc01d0114801dc01d0119801d841d010d901d941d01149c1da01d011e9c1da01d0121a01db01d011ca01db01d0120a01da41d0119b01db81d011bb01db81d011eb01db41d0117b81dc01d0119b81dc01d011cc01d001e0117c01d001e011cc01dc41d010dc81dcc1d011cc81dcc1d0120d01ddc1d011cd01ddc1d0120dc1de01d011edc1de01d0121e01df01d011ce01df01d0120e01de41d010df01df81d011bf01df81d011ef01df41d0110f81d001e0119f81d001e011c001e101e011e001e101e0123001e401e0117001e401e011b001e021e0123001e041e010f101e181e011e101e181e0121101e121e0123101e141e0112181e201e011b181e201e0120201e301e011b201e301e011e201e221e0123201e241e010f301e381e0117301e381e011e301e321e0123301e341e0117381e401e0117381e401e011b401e441e0112401e441e0117401e441e010b441e481e0112441e481e0117441e481e010b481e4c1e0112481e4c1e0117481e4c1e010b501e541e0117501e541e011b501e541e010f581e601e011b581e601e011e581e5c1e0112601e801e011e601e801e0123601e641e0117781e801e0102781e801e0104801eb01e011c801e841e013d801eb01e0128801eb01e0110801e841e010d841e881e013d881e8c1e010d901ea01e0102901ea01e0104901e941e013b901e941e0112981e9c1e0138981e9c1e01129c1ea01e01389c1ea01e0114a41ea81e0114a81eac1e0134b01ec01e0102b01ec01e0104b01eb41e011cb01eb41e0136b01eb41e0128b01eb41e0110b01eb41e0117b41eb81e011eb41eb81e012ab41eb81e0112b81ebc1e011cb81ebc1e0131b81ebc1e0128b81ebc1e0110b81ebc1e0114bc1ec01e011bbc1ec01e0127bc1ec01e010fc01ef01e011cc01ec41e013dc01ef01e0128c01ef01e0110c01ec41e010dc41ec81e013dc81ecc1e010dd01ee01e0102d01ee01e0104d01ed41e013bd01ed41e0112d81edc1e0138d81edc1e0112dc1ee01e0138dc1ee01e0114e41ee81e0114e81eec1e0134f01e001f0102f01e001f0104f01ef41e0120f01ef41e0136f01ef41e012cf01ef41e0114f01ef41e0117f41ef81e0121f41ef81e012df41ef81e0115f81efc1e0120f81efc1e0131f81efc1e012cf81efc1e0114f81efc1e0114fc1e001f011efc1e001f012afc1e001f0112001f281f0120001f041f013d001f281f012c001f281f0114001f041f0110041f081f013d081f0c1f0110101f201f0102101f201f0104101f141f013b101f141f0117181f1c1f0138181f1c1f01171c1f201f01381c1f201f011c241f281f011c281f301f011c281f2c1f0134281f301f0128281f301f0110301f401f0102301f401f0104301f381f0117301f341f0136301f381f0123301f381f010b301f341f011e381f401f011c381f3c1f0131381f401f0128381f401f0110381f3c1f011c401f4c1f0120401f441f013d401f4c1f012c401f4c1f0114401f441f0114441f481f013d4c1f581f01214c1f581f012d4c1f581f0115501f601f0102501f601f0104501f541f013b501f541f0114581f601f0123581f5c1f0138581f601f012f581f601f0117581f5c1f01145c1f601f0138601f701f011e601f701f012a601f701f0112601f641f0112681f6c1f0134681f6c1f0114701f801f0102701f801f0104701f801f011c701f741f0136701f801f0128701f801f0110701f741f0112781f7c1f0131781f7c1f0110801fb01f011c801f841f013d801fb01f0128801fb01f0110801f841f010d841f881f013d881f8c1f010d901fa01f0102901fa01f0104901f941f013b901f941f0112981f9c1f0138981f9c1f01129c1fa01f01389c1fa01f0114a41fa81f0114a81fac1f0134b01fc01f0102b01fc01f0104b01fb41f011cb01fb41f0136b01fb41f0128b01fb41f0110b01fb41f0117b41fb81f011eb41fb81f012ab41fb81f0112b81fbc1f011cb81fbc1f0131b81fbc1f0128b81fbc1f0110b81fbc1f0114bc1fc01f011bbc1fc01f0127bc1fc01f010fc01ff01f011cc01fc41f013dc01ff01f0128c01ff01f0110c01fc41f010dc41fc81f013dc81fcc1f010dd01fe01f0102d01fe01f0104d01fd41f013bd01fd41f0112d81fdc1f0138d81fdc1f0112dc1fe01f0138dc1fe01f0114e41fe81f0114e81fec1f0134f01f00200102f01f00200104f01ff41f011cf01ff41f0136f01ff41f0128f01ff41f0110f01ff41f0117f41ff81f011ef41ff81f012af41ff81f0112f81f00200120f81ffc1f0131f81f0020012cf81f00200114f81ffc1f011400202820012000200420013d00202820012c00202820011400200420011004200820013d08200c20011010202020010210202020010410201420013b10201420011718201c20013818201c2001171c20202001381c202020011c24202820011c28203020011c28202c20013428203020012828203020011030204020010230204020010430203820011730203420013630203820012330203820010b30203420011e38204020011c38203c20013138204020012838204020011038203c20011c40204c20012040204420013d40204c20012c40204c20011440204420011c44204820013d4c20582001214c205820012d4c20582001154c205020011e50206020010250206020010450205420013b58206020012358205c20013858206020012f58206020011758205c2001205c206020013860208020012360208020012f60208020011760206420012064206820012868206c2001346c207020011e70208020010270208020010470207420013678207c20013178207c20011c8020b020011c80208420013d8020b02001258020b02001288020b020010d8020b020011080208420010d84208820013d88208c20010d9020a02001029020a020010490209420013b90209420011298209c20013898209c2001129c20a02001389c20a0200114a420a8200114a820ac200134b020c0200102b020c0200104b020b420011cb020b4200136b020b4200125b020b4200128b020b420010db020b4200110b020b4200117b420b820011eb420b8200127b420b820012ab420b820010fb420b8200112b820bc20011cb820bc200131b820bc200125b820bc200128b820bc20010db820bc200110b820bc200114bc20c020011bbc20c0200123bc20c0200127bc20c020010bbc20c020010fc020f020011cc020c420013dc020f0200125c020f0200128c020f020010dc020f0200110c020c420010dc420c820013dc820cc20010dd020e0200102d020e0200104d020d420013bd020d4200112d820dc200138d820dc200112dc20e0200138dc20e0200114e420e8200114e820ec200134f02000210102f02000210104f020f4200120f020f4200136f020f4200128f020f420012cf020f4200110f020f4200114f020f4200117f420f8200121f420f820012af420f820012df420f8200112f420f8200115f820fc200120f820fc200131f820fc200128f820fc20012cf820fc200110f820fc200114f820fc200114fc200021011efc2000210127fc200021012afc200021010ffc200021011200212821012000210421013d00212821012800212821012c00212821011000212821011400210421011004210821013d08210c21011010212021010210212021010410211421013b10211421011718211c21013818211c2101171c21202101381c212021011c24212821011c28213021011c28212c21013428213021012528213021012828213021011028213021010d30214021010230214021010430213821011730213421013630213821011e30213821012330213821010630213821010b30213421011e38214021011c38213c21013138214021012538214021012838214021010d38214021011038213c21011c40214c21012040214421013d40214c21012840214c21012c40214c21011040214c21011440214421011444214821013d4c21582101214c215821012a4c215821012d4c21582101124c215821011550216021010250216021010450215421013b50215421011458216021012358215c21013858216021012c58216021012f58216021011458216021011758215c2101145c216021013860217021011e60217021012760217021012a60217021010f60217021011260216421011268216c21013468216c21011470218021010270218021010470218021011c70217421013670218021012570218021012870218021010d70218021011070217421011278217c21013178217c2101108021b021011c80218421013d8021b02101258021b02101288021b021010d8021b021011080218421010d84218821013d88218c21010d9021a02101029021a021010490219421013b90219421011298219c21013898219c2101129c21a02101389c21a0210114a421a8210114a821ac210134b021c0210102b021c0210104b021b421011cb021b4210136b021b4210125b021b4210128b021b421010db021b4210110b021b4210117b421b821011eb421b8210127b421b821012ab421b821010fb421b8210112b821bc21011cb821bc210131b821bc210125b821bc210128b821bc21010db821bc210110b821bc210114bc21c021011bbc21c0210123bc21c0210127bc21c021010bbc21c021010fc021f021011cc021c421013dc021f0210125c021f0210128c021f021010dc021f0210110c021c421010dc421c821013dc821cc21010dd021e0210102d021e0210104d021d421013bd021d4210112d821dc210138d821dc210112dc21e0210138dc21e0210114e421e8210114e821ec210134f02100220102f02100220104f021f421011cf021f4210136f021f4210125f021f4210128f021f4210112f021f4210117f021f4210117f421f821011ef421f8210127f421f821012af421f8210114f421f8210119f82100220120f821fc210131f82100220128f8210022012cf821fc210115f821fc21011bf821fc210114fc2100220117fc210022011c00223022012000220422013d00223022012800223022012c00223022011700223022011c00220422011004220822013d08220c22011010222022010210222022010410221422013b10221422011718221c22013818221c2201171c22202201381c222022011c24222822011c28222c22013430224022010230224022010430223822011e30223422013630223822012730223822012a30223822010f30223822011230223422011e38224022011c38223c22013138224022012538224022012838224022010d38224022011038223c22011c40224422011b40224422013d40224422012340224422012740224422010b40224422010f40224422011c44224822011c44224822013d44224822012544224822012844224822010d44224822011048225022011b48225022012348225022012748225022010b48225022010f4c225022011e50226022010250226022010450225822011c50225422013b50225822012550225822012850225822010d50225822011058226022011e58225c22013858226022012758226022012a58226022010f58226022011258225c2201205c226022013860227022011760227022011e60227022012360227022010660227022010b60226422012064226822012868226c2201346c227022011e70228022010270228022010470228022011b70227422013670228022012370228022012770228022010b70228022010f78227c22013178227c22011c80228222012584228622012588228c22011788228a2201238c22902201178c228e22012090229222012398229a2201239c229e22011ca022a4220117a022a222011ea822aa22011eb022b222011eb822bc220117bc22be22011cc022c222011ec822cc220117c822ca22011ecc22d0220117d022d222011ed822da22011edc22de22011ce022e4220117e022e222011ee422e622011ee822ea220120f022f4220117f022f222011900230223012504230623012508230c23011708230a2301230c23102301170c230e23012010231223012318231a2301231c231e23011c20232423011720232223011e28232a23011e30233223011e38233c2301173c233e23011c40234223011e48234c23011748234a23011e4c23502301174c234e23011c50235223011e58235a23011e5c235e23011c60236423011760236223011e64236623011e68236a23012070237423011770237223011980238423010d80238423011980238223012584238823010d84238823011984238623012588238c23011788238c23010b88238c23011788238a2301238c23902301178c23902301088c23902301148c238e23012090239423010b90239423011790239223012398239c23010898239c23011498239a2301209c23a02301049c23a02301109c239e23011ca023a4230117a023a4230106a023a4230112a023a223011ea823ac230106a823ac230112a823aa23011eb023b4230106b023b4230112b023b223011eb823bc230117bc23c0230104bc23c0230110bc23be23011cc023c4230106c023c4230112c023c223011ec823cc230117c823cc230104c823cc230110c823ca23011ccc23d0230117d023d4230106d023d4230112d023d223011ed823dc230106d823dc230112d823da23011edc23e0230104dc23e0230110dc23de23011ce023e4230117e023e4230106e023e4230112e023e223011ee423e8230106e423e8230112e423e623011ee823ec230108e823ec230114e823ea230120f023f4230117f023f4230101f023f423010df023f223011900240424010d00240424011900240224012504240824010d04240824011904240624012508240c24011708240c24010b08240c24011708240a2401230c24102401170c24102401080c24102401140c240e24012010241424010b10241424011710241224012318241c24010b18241c24011718241a2401231c24202401041c24202401101c241e24011c20242424011720242424010620242424011220242224011e28242c24010628242c24011228242a24011e30243424010630243424011230243224011e38243c24011738243c24010638243c2401123c24402401043c24402401103c243e24011c40244424010640244424011240244224011e44244824010644244824011244244624011e48244c24011748244c24010448244c24011048244a24011c4c24502401174c24502401044c24502401104c244e24011c50245424010650245424011250245224011e58245c24010658245c24011258245a24011e5c24602401045c24602401105c245e24011c60246424011760246424010660246424011260246224011e64246824010664246824011264246624011e68246c24010868246c24011468246a24012070247424011770247424010170247424010d70247224011980248224011e84248624011e88248a240120902492240119a024a2240112a424a6240112a824aa240114b024b224010dc024c2240117c424c6240117c824ca240117d024d224011cd824da240120e024e224011ef024f8240102f024f8240104`), music.PlaybackMode.LoopingInBackground)
level = 1
cooldown = 5
shootRate = 10
info.setLife(4)
initLevel()
gameStart = true
game.onUpdateInterval(500, function () {
    controller.moveSprite(lewis, 96, 0)
    makeBadGuysShoot()
    if (lewis.isHittingTile(CollisionDirection.Top)) {
        lewis.vy = 0
    }
    if (lewis.isHittingTile(CollisionDirection.Bottom)) {
        canDoubleJump = false
        canDoubleJump = true
    }
    if (lewis.vy == 0) {
        lewis_left_anim = lewis_left_norm
        lewis_right_anim = lewis_right_norm
        if (jumping) {
            jumping = false
            forcePlayerSpriteUpdate()
        }
    }
    if (randint(0, 10) == 0) {
        spawnHearts(1)
    }
})
