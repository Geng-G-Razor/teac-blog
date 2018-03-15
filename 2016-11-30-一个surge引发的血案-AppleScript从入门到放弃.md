---
title: 一个surge引发的血案--AppleScript从入门到放弃
date: 2016-11-30 17:00:16
tags:
  - ggf
  - mac
  - appleScript
  - surge
  - 全键盘
---
# <span style="color: red">WARNING</span>
	
本文章比较血腥暴力，请 windows 用户自觉在 mac 用户陪同下观看

# 前言

话说 surge 真是个神器啊，我之前就觉得它是个番羽土啬软件，没有想到是

1. 它是个如此强大的番羽土啬软件，功能超级全面
2. 正是作者据说，它确实是款网络调试工具，同样强大的可怕

在用surge之前，

1. 番羽土啬用小飞机（中规中矩吧，surge的自动切换速度最快的节点太强大），
2. 网络调试用charles（界面不喜欢，感觉挺笨重的，map时不能全程用快捷键），
3. 终端还得配置proxychain 4（小飞机不支持终端番羽土啬，得自己配置）。

用surge之后，

整个世界都清净了,

3个需求，1个应用全解决。

<br>

<!--more-->

# 正文

<br>

### 第一章 引子

<br>

surge怎么用，我就不献丑了，毕竟珠玉在前。

我就直接说说我用得不爽的地方吧。

现在呢，我用surge作为网络代理使用，把某手机端项目的本地代码代理到线上。

这个项目代号为 `X项目` 吧

为什么要代理到线上呢，因为X项目是跑在微信里的，如果直接跑本地，很多功能不能用。

比如说：

1. 微信分享
2. 微信定位
3. 游客模式

神马的

所以呢，代理到线上那是必须的。

然后呢，我们算一笔帐。

我们的X项目有3个环境

* 测试
* 预发
* 线上

包含四个子项目，

* anonym01 (9901)
* anonym02 (9902)
* anonym03 (9903)
* anonym04 (9904)

3个环境，4个子项目，有多少种排列组合的方式？

这简直是一道惨绝人寰的高中数学题啊。

解：

    证明过程略

    假设我常用 6 种组合

    假设成立，答案是 常用6种


Surge 切换代理需要用手点icon，那么假设有6个配置文件，每个配置文件都要用到，每天去点它，切换配置，真的好累。

给现在的配置文件上个图, 用手在触摸板上点，真得很麻烦，我需要全键盘的解决方案

![](/images/20161103/1.png)





<br/>

### 第二章 看似光明的前景

<br/>

明确了我不爽的地方，那么我要做的事情也变得清晰了：

通过各种方法，如
* alfred
* appleScript
* shell

来一键切换配置文件，免我手点之忧。

<br/>

#### 第一站 百度谷歌

<br/>

下了三个插件，全都不能用，这就是这场血案的开端。

![](/images/20161103/2.png)

不过我发现它们都有一句相同的代码，做为结尾

`tell application surge to reload`

这是明显的 appleScript 语法，让 surge 重新加载，而且这句话之前的代码都有效，唯独到这里无效。

那么显然是这句话有问题，为了实现功能，就得改一下这话。

或者实现这句话的功能。

考虑再三之后，踏上了自学 appleScript 的不归路。

<br/>

#### 第二站 appleScript 语法学习

<br/>

别看 appleScript 名字跟 javaScript 很像，实际上它们的思想也很像。

javaScript 是通过自己的语法来操纵 DOM， appleScript 其实也差不多。

只不过这里的DOM变成了 application 的各项功能，比如说：刷新，退出，最小化，最大化这些东西。

以后我就用 DOM 来指代这些操作，便于理解。

我的目的是实现功能，所以更专注 DOM 这一块，语法就粗略地看了一下，有需要时再去查。

语法的话， 可以看下这本书 《appleScript for absolute starters》，非常的浅显易懂。

主要讲的是，数据结构，基本上跟 js 也没多大差别，还有些常用的 api，及一些常用的 dom 操作。

比如说 

	tell application "Finder"
		beep
	end tell 

就是让`Finder`程序发出 ‘滴’ 的一声(此处有歧义，只是做为举例）。

因为`beep`是个系统级别的操作，是系统发出的'滴'，而不是 "Finder"。

接下来，我们就看看 appleScript 怎么进行DOM操作，来实现我们需要的功能。

<br/>

#### 第三站 ‘DOM‘ 操作

<br/>

根据我粗浅的总结，appleScript 一共有三种形式的DOM操作，每种形式都有自己的优势和不足，所以都会有应用的场景。

而且三种形式都很简单，简单到很有趣的地步。

好，接下来，我们就来看看这些有趣的操作。

不过在开始前，请先打开 mac 里的 Script Eidtor 程序，这是开发 appleScript 的不二选择。

打开 Script Editor 可以通过

* Alfred 搜索打开，
* Spotlight 搜索打开，
* launchPad 搜索打开。

我不会说它的路径在哪，因为这毫无意义。

接下来进入第三章，专门讲一下 DOM 操作

<br/>

### 第三章 实践起来

<br/>

#### 一 数据字典
<br/>

DOM 操作的第一种方法就是 数据字典。

没有数据字典时，写 appleScript 就是盲人摸象，有了数据字典，世界一片光明。

接下来看看数据字典的神奇功能

首先，打开 script Editor，新建一个文件。

然后在 菜单 > 文件 > 打开字典

会弹出一个窗口
![](/images/20161103/3.png)

作为实践，我们选择 Finder 程序吧。

这毕竟是 Mac 自带应用，支持会好一点。

我们可以看到， 这里有许多条目，大概有数百个吧。
![](/images/20161103/4.png)

其实，这些就是 Finder 支持的 DOM 操作。也就是说 Finder 支持数百个 appleScript 的操作。

可以说是非常强大了。

如果对此没有什么概念，可以拿咱们今天的主角兼大反派 Surge 来对比下。

以同样的方式打开 Surge
![](/images/20161103/5.png)

数量大大减少， 如果你仔细看看这些条目的名字，你就会发现这些名字非常的通俗，常见，因为它们全是系统自带的操作或属性，是每个程序都有的。

也就是说 Surge 对数据字典的支持为 0。

作者压根没有为 Surge 写数据字典

这是个不幸的消息，也为之后的种种不幸埋下了伏笔。

先不管 surge 不支持数据字典，既然我们看到这了，那就来操作一下吧。

图中有个 'quit' 大家都看到了， 它是什么意思也是很明确的了， 那么我们写一句来试试看。
在 script Editor 的页面中这么写：

    tell application "Finder"
        quit
    end tell

如果你担心写错，可以这样：

在 script Editor 页面中右键一下，选中最下面一个 'tell block', 会弹出一些子菜单，点击一个吧
![](/images/20161103/6.png)

代码就帮你写好了，然后我们加一个 quit 就行了。

写完之后，通过 command + r 来执行。

然后惊喜的发现 Finder 真的被退出了。

我之所以这么惊讶，是因为 Finder 是不能通过 command + q 退出的，我本以为 quit 命令也不能让它退出，这个结果，有些出乎我的意料。

这个示例非常简单，不过通过数据字典，配合 appleScript 的语法，可以写出非常丰富的功能。比如：

    tell application "Finder"
       empty the trash
       beep
    end tell


这句代码是干吗的，也不用解释了吧。是不是超级简单。

更多复杂的功能咱就不写了，毕竟我自己我不会写啊。

总之，数据字典提供了原材料，script Editor 提供了锤子，能不能造出轮子，还要看自己。

<br>

#### menu bar 1
<br>

刚才，我们也看到了，Surge 只支持系统自带的数据字典。 `tell application "Surge" to reload` 显然是无法工作的。

至此，我们明白了，Alfred的插件为何无法工作。

为了实现需要的功能，我们只好换个方法了。 接下来就要讲到方法二，菜单栏点击。

mac 的菜单栏应该不用介绍了， 基本每个程序打开后，都会在屏幕左上角显示它的菜单栏。

（请注意`基本`这两个字,又埋下了一个伏笔）

菜单栏的字菜单又会有非常多的操作， 我们来看一眼，继续以 Finder 为例。
![](/images/20161103/7.png)

好多操作，应该可以满足我们的需求了。

appleScript 提供了点击这些菜单的方法。

让我们来试试,  为了方便看效果，我们以 Script Editor 做为目标程序。

不停的按 command + r ，就会看到效果切换。

    tell application "System Events"
        tell process "Script Editor"
            tell menu bar 1
                tell menu bar item "View"
                    tell menu "View"
                        click menu item "Show Tab Bar"
                    end tell
                end tell
            end tell
        end tell
    end tell

把代码拷进去， 用 command + r 运行一下， 是不是发现，标签栏的显示会切换一下，再按一下，又切换一下。

试着读一下这些代码，非常的易懂。

这句代码，就相当于手动去点 菜单 > View > Show Tab Bar

感觉好省力。

这里的代码有几个需要注意的地方。

1. 通过 `"System Events"` 来执行这些操作，可能是出于权限和接口统一方面的考虑。
2. `tell menu bar 1` 这里的menu bar 1 就是左上角的菜单栏，有1就有2，2我们过会讲。
3. `tell menu bar item "View"` 之后 还要 `tell menu "View"`, 有点冗余，不过就得这么写

Ok， 这样我们就实现了模拟点击菜单栏，来完成操作。 再来一个通用的函数来包装一下，也可以参考下写法。

    on do_submenu(app_name, menu_name, menu_item, submenu_item)
   	try
   		-- bring the target application to the front
   		tell application app_name
   			activate
   		end tell
   		tell application "System Events"
   			tell process app_name
   				tell menu bar 1
   					tell menu bar item menu_name
   						tell menu menu_name
   							tell menu item menu_item
   								tell menu menu_item
   									click menu item submenu_item
   								end tell
   							end tell
   						end tell
   					end tell
   				end tell
   			end tell
   		end tell
   		return true
   	on error error_message
   		return false
   	end try
    end do_submenu

看起来很乱是吧，没关系，原理其实跟之前的代码一样，一句句捋下来会觉得很清楚。

好了，再回到本文的主角兼反派 Surge 身上，

我们希望它能 reload 一下，能做到吗？

做为主角兼反派，如果这么容易就被干掉了，那观众岂不是很不尽兴。

所以我们的大反派依旧屹~立~不~倒~。

导演，它戏份怎么这么重，是不是潜规则了？

它是怎么做到的呢？ 很简单:

Surge 没有 menu bar 1。

还能不能快乐的玩耍了！！！！

<br>

#### menu bar 2

<br>

这样都不行，只能祭出最后一招了，就是刚才提到的 menu bar 2。

大家都知道， mac 的菜单栏分成两个部分，左边的是常见的菜单栏，会有各种操作项。

右边的更像是状态栏吧，各种 icon 都会放在这里，如图：

![](/images/20161103/8.png)

所谓的 menu bar 2 就是右边的菜单栏，这里同样是可以操作的。

比如，我要通过脚本来点击这个 quit 按钮，也是可以实现的。

![](/images/20161103/9.png)

不过要手写实在是有点麻烦，千头万绪地，拎不清，这里我们可以借助一个工具，这个工具教我们怎么写。

UI Browser 请自行搜索下载。

![](/images/20161103/10.png)

这次我们不能用 Finder 或者 Script Editor 做实验了， 因为它们没有 menu bar 2。不过 Surge 是有的。

下载 UI Browser 并打开， 点击左下角的 Switch to Screen Reader。

然后找一个 menu bar 2 的程序点一点，这里我用 Flux 做实验 。

(为什么不用Surge呢， 这里又埋下了伏笔)

如图：

![](/images/20161103/11.png)

留意下，ELEMENT 和 ELEMENT PARH 下的内容，基本上把 menu的层级结构都展示出来了。

我们把这些层级结构套一下，DOM操作的方法，就可以实现相应的功能了。

尝试一下。在 Script Editor 中运行以下代码。

    tell application "Flux"
        tell application "System Events"
            tell process "Flux"
                tell menu bar 1
                    tell menu bar item 1
                        click
                        click menu item "Quit f.lux" of menu 1
                    end tell
                end tell
            end tell
        end tell
    end tell

这个脚本就会点击 flux 程序的退出按钮。

可以看到这边的写法，跟 menu bar 1 的写法非常类似，各种菜单项，都是根据 UI Browser 读取来写的，非常方便。

不过也有些要注意的地方。

1. 这里写的 menu bar 1, 而不是menu bar 2，这应该是因为 flux 没有menu bar 1，所以就把2改成了1，结果以 UI Browser为准。
2. 这里出现了两次`click`。因为 menu bar 2 是显式的模拟点击，是在GUI级别的，所以要先点一次把下拉菜单展示出来。
3. 这种写法会有些卡顿，应该是 OS X 的bug。网上有不卡顿的写法，上代码。


    ignoring application responses
    tell application "System Events" to tell process "Flux"
        click menu bar item 1 of menu bar 2
    end tell
    end ignoring
    do shell script "killall System\\ Events"
    delay 0.1
    tell application "System Events" to tell process "Flux"
    tell menu bar item 1 of menu bar 2
        click menu item "Disable for an hour" of menu 1
    end tell
    end tell

网上的代码，都比较高效吧，把多个操作合在一行写。

我呢，为了方便理解，一行一行分得很清，看起来比较冗余。

<br>

### 第四章 绝境
<br>

3种appleScript的DOM操作都写完了，虽然方法1，方法2 Surge 都不支持，但是方法三，应该支持吧。

毕竟Surge是有menu bar 2 的，有图为证。

![](/images/20161103/12.png)

UI Browser 也可以做证。

![](/images/20161103/13.png)

这下大Boss终于要被降服了，我只要模拟点击下 `Reload Configuration` 就大功告成了。

正所谓帅不过3秒。

现实给了我狠狠的一把掌： Surge 不支持这种写法。

方法三也失败了。

为什么呢，其实我也不知道为什么，毕竟对这个不熟。

不过我有个小小的猜测。

当我们把焦点聚焦到 menu bar 2 时，我们可以用左右方向键控制选中。

但是你会发现
* QQ
* 微信
* Siri

是不能用方向键选中的，Surge 也不行。

可能就是因为这个原因，导致appleScript不能`click`

So，失败了，失败了。踩了无数个坑，还是搞不定一个 Surge，也是无奈啊。

<br>

### 第五章 逢生
<br>

可是我不甘心就这么放弃啊，三天的努力，解决不了一个一丢丢的小问题。这种结果无法接受啊。

走火入魔的我，只好祭出究极大招，被封印的禁术：按键精灵。

这也是受到 menu bar 2 方法启发的。

mac 下有一款软件，和 windows 下的按键精灵倒是有点相似。

受益于 OS X 统一，完善的接口，该软件的能力远超 按键精灵。

这款软件就是 "keyboard maestro"

直译过来就是 "键盘大师"， 好low的名字。

尽管这是款非常强大的软件，但是迫于无奈，我是把它当按键精灵用了

做了这样一个操作，如图

![](/images/20161103/14.png)

简单的说一下，

就是鼠标移到了surge图标那里，点一下

再移到切换配置菜单上，弹出子菜单

再移到子菜单的各种配置上

然后我通过方向键控制，选择一下。

因为我是通过GUI进行操作的，所以Surge会自动刷新。

最终我还是实现了我的需求。

按下快捷键，半秒后打开下图中的界面

之后就可以用键盘选择配置文件了。

![](/images/20161103/15.png)

## 后记
新版 Surge 对reload的机制做了修改。

当配置文件变化时，会自动reload。

讲道理，开头讲到的 Alfred 插件可以用了，因为不用`tell application "Surge" to reload`了

心累， 暂时不想尝试了。

不过最起码，咱学到了些东西。

令人崩溃的， 'appleScript从入门到放弃' 终于结束了。

大家再见。

