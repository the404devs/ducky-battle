namespace SpriteKind {
    export const duckBullet = SpriteKind.create()
    export const Heart = SpriteKind.create()
    export const gui = SpriteKind.create()
    export const effect = SpriteKind.create()
}
/**
 * cant shoot during rage bc pause is technically in button press event
 */
// TODO:
// 
// Reds sometimes do laser beams
// 
// Hearts too frequent
// 
// Coin in sparkle anim didn't despawn on level regen
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
        killCount += 1
        pause(500)
        sprites.destroy(sprite)
        spawnEvilDucks(1)
    }
})
function pxToTileCoord (num: number) {
    return Math.floor(num / 16 - 0)
}
function initHud () {
    redGuyCounter = textsprite.create("x0")
    redGuyCounter.setIcon(img`
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
        `)
    redGuyCounter.setMaxFontHeight(8)
    redGuyCounter.setFlag(SpriteFlag.RelativeToCamera, true)
    redGuyCounter.setPosition(16, 112)
    redGuyCounter.z = 16
    aimText = textsprite.create("Aim")
    aimText.setFlag(SpriteFlag.RelativeToCamera, true)
    aimText.setPosition(134, 113)
    aimText.z = 16
    aimIndicator = sprites.create(assets.image`arrow`, SpriteKind.gui)
    aimIndicator.setFlag(SpriteFlag.RelativeToCamera, true)
    aimIndicator.setPosition(152, 113)
    aimIndicator.z = 16
    hudFrame = sprites.create(assets.image`hudFrame`, SpriteKind.gui)
    hudFrame.setFlag(SpriteFlag.RelativeToCamera, true)
    hudFrame.setPosition(80, 112)
    hudFrame.z = 15
    rageIcon = sprites.create(assets.image`rage0`, SpriteKind.gui)
    rageIcon.setFlag(SpriteFlag.RelativeToCamera, true)
    rageIcon.setPosition(70, 113)
    rageIcon.z = 16
    rageMeter = sprites.create(assets.image`rageMeter0`, SpriteKind.gui)
    rageMeter.setFlag(SpriteFlag.RelativeToCamera, true)
    rageMeter.setPosition(100, 112)
    rageMeter.z = 16
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameStart) {
        playerShoot()
        if (killCount >= 11 && !(sprites.readDataBoolean(lewis, "rage"))) {
            duckyRage()
        } else {
            playerShoot()
        }
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
            d . . . . . . . . . . . . . . d 
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
            d . . . . . . . . . . . . . . d 
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
            d . . . . . . . . . . . . . . d 
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
            d . . . . . . . . . . . . . . d 
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
    versionText = textsprite.create("v" + VERSION)
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
    versionText.setPosition(10, 8)
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
    for (let index = 0; index < num; index++) {
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
    animation.runImageAnimation(
    otherSprite,
    [img`
        ....................
        ....................
        ....................
        ..........21........
        ..........22........
        ....21..............
        ....32........221...
        ........2211..322...
        .......2d211........
        .......e3222........
        .......e33d2........
        ....e1..ee2.........
        ....ee......3223....
        ............2112....
        ......ee1...2112....
        ......eee...3223....
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
        ............333.....
        .....33.....333.....
        .....33..33.333.....
        .........33.........
        ....................
        ....................
        .............3......
        ......3.............
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
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        `],
    100,
    false
    )
    otherSprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    info.changeLifeBy(1)
    pause(500)
    sprites.destroy(otherSprite)
})
function updateHud () {
    redGuyCounter.setText("x" + countNonDeadRedGuys())
    aimIndicator.rotationDegrees = 90 + getAngleBetweenSprites(computeNearestBadGuyToPlayer(), lewis)
    updateRageMeter(killCount)
}
info.onCountdownEnd(function () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.duckBullet)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
    game.splash("Level " + level + " complete!", "Score: " + info.score())
    level += 1
    initLevel()
})
function makeBadGuysShoot () {
    allBadGuys = sprites.allOfKind(SpriteKind.Enemy)
    for (let bad_guy of allBadGuys) {
        index32 = allBadGuys.indexOf(bad_guy)
        if ((game.runtime() + index32) % shootRate == 0 && !(sprites.readDataBoolean(bad_guy, "isdead"))) {
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
function duckyRageEnd () {
    rageBubble.setFlag(SpriteFlag.Invisible, true)
    effects.blizzard.endScreenEffect()
    rageCooldown = 50
    killCount = 0
    sprites.setDataBoolean(lewis, "rage", false)
    animation.stopAnimation(animation.AnimationTypes.MovementAnimation, rageMeter)
    animation.stopAnimation(animation.AnimationTypes.MovementAnimation, rageIcon)
    rageMeter.setPosition(100, 112)
    rageIcon.setPosition(70, 113)
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
    if (!(sprites.readDataBoolean(sprite, "rage"))) {
        music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
        info.changeScoreBy(-1)
        info.changeLifeBy(-1)
        grantInvincibility()
    }
    pause(500)
    sprites.destroy(otherSprite)
})
function countNonDeadRedGuys () {
    count = 0
    for (let bad_guy2 of sprites.allOfKind(SpriteKind.Enemy)) {
        if (!(sprites.readDataBoolean(bad_guy2, "isdead"))) {
            count += 1
        }
    }
    return count
}
function generateRandomPlatforms () {
    x = 1
    for (let index = 0; index < 14; index++) {
        y = 1
        for (let index = 0; index < 14; index++) {
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
    for (let index = 0; index < num; index++) {
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
        spawnAttempts = 0
        while (!(tiles.tileAtLocationEquals(tiles.getTileLocation(pxToTileCoord(preferredX), pxToTileCoord(preferredY)), assets.tile`transparency16`)) || distance < 96) {
            playerX = lewis.x
            playerY = lewis.y
            preferredX = roundToNearestInterval(randint(20, 230), 16)
            preferredY = roundToNearestInterval(randint(20, 230), 16)
            distance = getDistanceBetween2Points(preferredX, preferredY, playerX, playerY)
            spawnAttempts += 1
            if (spawnAttempts >= 100) {
                break;
            }
        }
        if (spawnAttempts >= 0) {
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
        rageBubble.vy = -120
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1, 3328, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        canDoubleJump = true
    } else if (canDoubleJump) {
        music.play(music.createSoundEffect(WaveShape.Sawtooth, 1264, 2054, 255, 0, 500, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        lewis_right_anim = lewis_right_boost
        lewis_left_anim = lewis_left_boost
        forcePlayerSpriteUpdate()
        lewis.startEffect(effects.trail, 500)
        if (!(sprites.readDataBoolean(lewis, "rage"))) {
            scene.cameraShake(2, 250)
        }
        rageBubble.vy = -200
        lewis.vy = -200
        canDoubleJump = false
    }
}
function spawnHearts (num: number) {
    for (let index = 0; index < num; index++) {
        preferredX = roundToNearestInterval(randint(20, 230), 16)
        preferredY = roundToNearestInterval(randint(20, 230), 16)
        while (!(tiles.tileAtLocationEquals(tiles.getTileLocation(pxToTileCoord(preferredX), pxToTileCoord(preferredY)), assets.tile`transparency16`))) {
            preferredX = roundToNearestInterval(randint(20, 230), 16)
            preferredY = roundToNearestInterval(randint(20, 230), 16)
        }
        spawnHeartAtPos(preferredX, preferredY)
    }
}
function updateRageMeter (k: number) {
    effects.clearParticles(rageMeter)
    if (k == 0) {
        animation.runImageAnimation(
        rageMeter,
        assets.animation`rageAnim0`,
        100,
        true
        )
    } else if (k == 1) {
        animation.runImageAnimation(
        rageMeter,
        assets.animation`rageAnim1`,
        100,
        true
        )
    } else if (k == 2) {
        animation.runImageAnimation(
        rageMeter,
        assets.animation`rageAnim2`,
        100,
        true
        )
    } else if (k == 3) {
        animation.runImageAnimation(
        rageMeter,
        assets.animation`rageAnim3`,
        100,
        true
        )
    } else if (k == 4) {
        animation.runImageAnimation(
        rageMeter,
        assets.animation`rageAnim4`,
        100,
        true
        )
    } else if (k == 5) {
        animation.runImageAnimation(
        rageMeter,
        assets.animation`rageAnim5`,
        100,
        true
        )
    } else if (k == 6) {
        animation.runImageAnimation(
        rageMeter,
        assets.animation`rageAnim6`,
        100,
        true
        )
    } else if (k == 7) {
        animation.runImageAnimation(
        rageMeter,
        assets.animation`rageAnim7`,
        100,
        true
        )
    } else if (k == 8) {
        animation.runImageAnimation(
        rageMeter,
        assets.animation`rageAnim8`,
        100,
        true
        )
    } else if (k == 9) {
        animation.runImageAnimation(
        rageMeter,
        assets.animation`rageAnim9`,
        100,
        true
        )
    } else if (k == 10) {
        animation.runImageAnimation(
        rageMeter,
        assets.animation`rageAnim10`,
        100,
        true
        )
    } else {
        rageMeter.startEffect(effects.fire)
        animation.runImageAnimation(
        rageMeter,
        assets.animation`rageAnim11`,
        100,
        true
        )
        if (!(sprites.readDataBoolean(lewis, "rage"))) {
            duckyRage()
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.setPosition(otherSprite.x - 4, otherSprite.y - 4)
    animation.runImageAnimation(
    otherSprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . b . . . . . . . 
        . . . . . . . b d b . . . . . . 
        . . . . . . . c d c . . . . . . 
        . . . . . . . c 5 c . . . . . . 
        . . . . . . c d 5 d c . . . . . 
        . . . b c c d 5 5 5 d c c b . . 
        . . b d d 5 5 5 5 5 5 5 d d b . 
        . . . b c c d 5 5 5 d c c b . . 
        . . . . . . c d 5 d c . . . . . 
        . . . . . . . c 5 c . . . . . . 
        . . . . . . . c d c . . . . . . 
        . . . . . . . b d b . . . . . . 
        . . . . . . . . b . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . b b . . . . . . . . . 
        . . . . b 5 b b . . . . . . . . 
        . . b b 5 5 5 b b b . . . . . . 
        . b 5 5 5 5 5 5 5 b . . b . . . 
        . . b b 5 5 5 b b . . b 5 b . . 
        . . b 5 5 b 5 5 b . b 5 5 5 b . 
        . . b 5 b b b 5 b . . b 5 b . . 
        . . b b . . b b b . . b b b . . 
        . b 5 b b . . . . . b 5 b . . . 
        b 5 5 5 b b . . . b b 5 b b . . 
        . b 5 b b 5 b . b 5 5 5 5 5 b . 
        . b b b 5 5 5 b b b 5 5 5 b b . 
        . . b 5 5 5 5 5 b b 5 b 5 b . . 
        . . . b 5 5 5 b . . b b b . . . 
        . . . b 5 b 5 b . . . . . . . . 
        . . . b b b b b . . . . . . . . 
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
    otherSprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    info.changeScoreBy(1)
    spawnCoins(1)
    pause(500)
    sprites.destroy(otherSprite)
})
function spawnHeartAtPos (x: number, y: number) {
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
function spawnPlayer () {
    rageBubble = sprites.create(assets.image`rageBubble`, SpriteKind.effect)
    rageBubble.setFlag(SpriteFlag.Invisible, true)
    lewis_left_norm = assets.animation`lewis_norm_l`
    lewis_right_norm = assets.animation`lewis_norm_r`
    lewis_left_boost = assets.animation`lewis_boost_l`
    lewis_right_boost = assets.animation`lewis_boost_r`
    lewis_left_anim = lewis_left_norm
    lewis_right_anim = lewis_right_norm
    lewis = sprites.create(assets.image`duck_r`, SpriteKind.Player)
    controller.moveSprite(lewis, 96, 0)
    controller.moveSprite(rageBubble, 96, 0)
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
    while (!(tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), assets.tile`transparency16`)) || !(tiles.tileAtLocationIsWall(tiles.getTileLocation(col, row + 1)))) {
        preferredX = roundToNearestInterval(randint(20, 230), 16)
        preferredY = roundToNearestInterval(randint(20, 230), 16)
        row = pxToTileCoord(preferredY)
        col = pxToTileCoord(preferredX)
    }
    lewis.setPosition(preferredX, preferredY)
    rageBubble.setPosition(preferredX, preferredY)
    lewis.ay = 294.3
    rageBubble.ay = 294.3
    lewis.z = 10
    sprites.setDataBoolean(lewis, "rage", false)
    scene.cameraFollowSprite(lewis)
}
function getAngleBetweenSprites (target: Sprite, source: Sprite) {
    if (target != null) {
        return Math.atan2(target.y - source.y, target.x - source.x) * 180 / Math.PI
    }
    return -90
}
function computeNearestBadGuyToPlayer () {
    let list = 0
    nearest_bad_guy = sprites.allOfKind(list)[0]
    distance_to_nearest_bad_guy = 10000
    for (let bad_guy3 of sprites.allOfKind(SpriteKind.Enemy)) {
        x1 = lewis.x
        y1 = lewis.y
        x2 = bad_guy3.x
        y2 = bad_guy3.y
        dx = x1 - x2
        dy = y1 - y2
        distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < distance_to_nearest_bad_guy && !(sprites.readDataBoolean(bad_guy3, "isdead"))) {
            distance_to_nearest_bad_guy = distance
            nearest_bad_guy = bad_guy3
        }
    }
    return nearest_bad_guy
}
function duckyRage () {
    rageBubble.setFlag(SpriteFlag.Invisible, false)
    music.play(music.melodyPlayable(music.siren), music.PlaybackMode.InBackground)
    sprites.setDataBoolean(lewis, "rage", true)
    lewis.sayText("DUCKY RAGE!!!", 500, false)
    lewis.startEffect(effects.halo, 5000)
    lewis.startEffect(effects.fire, 5000)
    lewis.startEffect(effects.trail, 5000)
    lewis.startEffect(effects.disintegrate, 5000)
    rageMeter.sayText("")
    scene.cameraShake(2, 5000)
    effects.blizzard.startScreenEffect(5000)
    animation.runMovementAnimation(
    rageIcon,
    animation.animationPresets(animation.shake),
    200,
    true
    )
    animation.runMovementAnimation(
    rageMeter,
    animation.animationPresets(animation.shake),
    200,
    true
    )
}
function initLevel () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    sprites.destroyAllSpritesOfKind(SpriteKind.Heart)
    sprites.destroyAllSpritesOfKind(SpriteKind.duckBullet)
    tiles.setCurrentTilemap(tilemap`level2`)
    generateRandomPlatforms()
    spawnPlayer()
    spawnCoins(20)
    spawnEvilDucks(level)
    game.splash("Level " + level)
    info.startCountdown(30)
    killCount = 0
    duckyRageEnd()
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
// TODO:
// 
// Reds sometimes do laser beams
// 
// Hearts too frequent
// 
// Coin in sparkle anim didn't despawn on level regen
function roundToNearestInterval (input2: number, interval: number) {
    spriteOffset = 8
    clampedValue = Math.floor(input2 / interval) * interval
    return clampedValue + spriteOffset
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (!(sprites.readDataBoolean(otherSprite, "isdead"))) {
        if (sprites.readDataBoolean(sprite, "rage")) {
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
            sprites.setDataBoolean(otherSprite, "isdead", true)
            otherSprite.unfollow()
            otherSprite.setFlag(SpriteFlag.Ghost, true)
            otherSprite.setVelocity(0, 0)
            music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
            info.changeScoreBy(2)
            killCount += 1
            pause(500)
            sprites.destroy(otherSprite)
            spawnEvilDucks(1)
        } else {
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
            sprites.setDataBoolean(otherSprite, "isdead", true)
            otherSprite.unfollow()
            otherSprite.setFlag(SpriteFlag.Ghost, true)
            music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
            scene.cameraShake(4, 500)
            info.changeScoreBy(-5)
            info.changeLifeBy(-1)
            spawnEvilDucks(1)
            grantInvincibility()
            pause(500)
            sprites.destroy(otherSprite)
        }
    }
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
let spawnAttempts = 0
let playerY = 0
let playerX = 0
let y = 0
let x = 0
let count = 0
let lewis_right_anim: Image[] = []
let nearest_bad_guy: Sprite = null
let rageBubble: Sprite = null
let projectile: Sprite = null
let index32 = 0
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
let versionText: TextSprite = null
let lastDirection = 0
let lewis: Sprite = null
let rageMeter: Sprite = null
let rageIcon: Sprite = null
let hudFrame: Sprite = null
let aimIndicator: Sprite = null
let aimText: TextSprite = null
let redGuyCounter: TextSprite = null
let killCount = 0
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
let rageCooldown = 0
let shootRate = 0
let cooldown = 0
let level = 0
let VERSION = 0
VERSION = 3
music.stopAllSounds()
showTitleScreen()
level = 1
cooldown = 5
shootRate = 25
rageCooldown = 50
info.setLife(4)
initHud()
initLevel()
gameStart = true
game.onUpdateInterval(100, function () {
    updateHud()
    cooldown += -1
    if (cooldown <= 0) {
        makeBadGuysShoot()
    }
    if (lewis.isHittingTile(CollisionDirection.Top)) {
        lewis.vy = 0
        rageBubble.vy = 0
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
    if (randint(0, 50) == 0) {
        spawnHearts(1)
    }
    if (sprites.readDataBoolean(lewis, "rage")) {
        rageCooldown += -1
    }
    if (rageCooldown <= 0) {
        duckyRageEnd()
        music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
    }
})
