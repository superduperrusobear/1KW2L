const stories = [
    {
        id: 1,
        title: "The Clipboard Catastrophe",
        content: "$5.6 million clipped\n\nTech-savvy Sam thought he was immune to scams until he installed what seemed to be a legitimate trading app. Unknown to him, it contained a clipboard hijacker that silently replaced crypto addresses with the hacker's own. When Sam copy-pasted his target wallet address, the malware swapped it out. Sam didn't notice the different address and sent his life savings to a stranger, who sent back nothing but a 🙏 emoji.\n\nLesson: What you paste isn't always what you copied."
    },
    {
        id: 2,
        title: "The Remote Desktop Robbery",
        content: "$2.9 million remotely relocated\n\nWhen Carol's computer started acting strange, she found a 'helpful' tech support number online. The friendly support agent asked for remote access to fix the 'virus.' Carol watched in confusion as her mouse seemed to develop a mind of its own, opening her crypto wallet and swiftly transferring her funds to an 'emergency security holding address.' The support agent assured her it was standard procedure, right before disconnecting and blocking her number.\n\nLesson: The only thing worse than a computer virus is a human parasite."
    },
    {
        id: 3,
        title: "The Rug Pull Romance",
        content: "$4.5 million love story\n\nAfter matching on a dating app with a crypto-savvy woman, Brian was convinced he'd found both love and wealth when she shared her 'exclusive investment group's' new token. He went all-in, converting his Bitcoin to 'LoveChain' tokens, which pumped 500% in a week. Just as Brian planned to propose with a ring bought from his paper gains, both his girlfriend and the token's liquidity vanished. The token's name changed to 'LonelyChain' and dropped to zero.\n\nLesson: The red flags in your romance might match the red candles in your portfolio."
    },
    {
        id: 4,
        title: "The Bathroom Bitcoin Blunder",
        content: "$3.7 million vanished\n\nMark was certain his crypto gains were safe - until nature called during a bull run. While scrolling through his portfolio on the toilet, his smartphone slipped from his sweaty palms into the bowl. In his panic to save the device, he flushed accidentally, sending both his phone and his non-backed-up wallet to the sewers. The plumber later found the waterlogged phone, but Mark's private keys had already gone where no recovery seed should ever go.\n\nLesson: Backup your wallet before you back up your bowels."
    },
    {
        id: 5,
        title: "The Diamond Hands Cremation",
        content: "$2.1 million incinerated\n\nOld man Jenkins vowed to have 'diamond hands' until his dying day. He succeeded - literally. After his passing, his family discovered his crypto fortune was stored on a hardware wallet... which he had instructed to be cremated with him 'for the afterlife.' The undertaker, unaware of what the strange USB device was, followed the instructions perfectly. Jenkins' portfolio reached peak heat rather than peak value.\n\nLesson: Your crypto keys and your corpse don't make good travel companions."
    },
    {
        id: 6,
        title: "The Sleepwalking Trader",
        content: "$890,000 nightmare\n\nChad took Ambien for his insomnia but developed an unusual side effect: sleep-trading. One night, his unconscious mind decided to go all-in on a coin called 'DreamCatcher.' When he woke up, he discovered he'd traded his entire portfolio for tokens that, in the light of day, turned out to be from a project run by actual 8-year-olds with a dream of building a 'rocket to Jupiter.' The project vanished faster than Chad's REM sleep.\n\nLesson: Secure your apps before you take your naps."
    },
    {
        id: 7,
        title: "The Final Transaction",
        content: "$12.8 million death pact\n\nThe DeSpairo twins made a suicide pact when their leverage trading went south: whoever lost the most would end it all, sending their remaining crypto to the survivor. After a catastrophic liquidation event, the loser followed through - but with a twist. He modified his hardware wallet to explode upon entering the PIN, taking both his life and the device with all their recovery phrases. His surviving brother found a note: 'If I can't have it, neither can you. HODL in hell.'\n\nLesson: The only thing that should be dead is your coins, not their owner."
    },
    {
        id: 8,
        title: "The Desperate Key Extraction",
        content: "$7.4 million worth of agony\n\nAfter forgetting his passphrase, Pete became convinced his key was stored somewhere in his subconscious. He hired an unlicensed 'crypto hypnotist' from the dark web who claimed to retrieve lost keys through 'neural extraction.' The procedure involved experimental drugs and a makeshift electroshock device in a basement. Pete's brain never yielded the passphrase, but the 'doctor' harvested his remaining accounts after he fell into a coma. Pete's body was found months later, skull drilled with tiny holes in the pattern of a private key that led to an empty wallet.\n\nLesson: Some memories are better left buried - unlike your seed phrase."
    },
    {
        id: 9,
        title: "The Deadman's Switch Defect",
        content: "$15.3 million family feud\n\nParanoid crypto millionaire Howard set up an elaborate 'deadman's switch' to transfer his fortune to his children upon his death, requiring his heartbeat signature once a month. When he suffered a massive heart attack, the system detected his irregular heartbeat as a hack attempt and initiated its security protocol: burning through all the funds in rapidly escalating gas fees sending thousands of worthless transactions. His children watched the inheritance disappear in real-time on his hospital room monitor as he flatlined.\n\nLesson: Your failsafe might just safely fail to save anything."
    },
    {
        id: 10,
        title: "The Crypto Cannibal Conundrum",
        content: "$31.5 million digested\n\nEccentric billionaire Vernon Hodl tattooed his seed phrase on 24 homeless people, one word per person. When a market crash hit, he snapped and turned them into a 'cryptographer's stew,' believing he could 'internalize' his wealth. Police found him in his vault, stomach cut open, trying to retrieve the digested fragments. The final irony? His fortune remained locked by an unknown BIP39 passphrase. The only transaction was the one that took him straight to the morgue.\n\nLesson: A cold wallet is better than a cold body - especially when the former doesn't involve cannibalism."
    },
    {
        id: 11,
        title: "The Adderall-Fueled Algorithm Apocalypse",
        content: "$18.7 million stimulated away\n\nCoder Tim's Adderall-fueled coding marathon led to a trading algorithm connected to his vital signs. During a livestreamed overdose, his seizure-induced heart rate triggered the algorithm to dump everything into 'CardiacCoin.' Tim survived rehab, but his investors' funds were scattered across thousands of dead-end transactions. The FBI discovered he had coded while believing he was 'one with the blockchain.'\n\nLesson: The only thing you should be pumping is your portfolio, not your prescription."
    }
];

// Function to get more stories (simulate pagination)
function getMoreStories(startIndex, count) {
    return stories.slice(startIndex, startIndex + count);
} 