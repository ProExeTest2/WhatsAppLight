import { images } from ".";

export const countries = [
    { name: 'United States', code: 'US', phoneCode: '+1' },
    { name: 'China', code: 'CN', phoneCode: '+86' },
    { name: 'India', code: 'IN', phoneCode: '+91' },
    { name: 'Brazil', code: 'BR', phoneCode: '+55' },
    { name: 'Russia', code: 'RU', phoneCode: '+7' },
    { name: 'Japan', code: 'JP', phoneCode: '+81' },
    { name: 'Germany', code: 'DE', phoneCode: '+49' },
    { name: 'United Kingdom', code: 'GB', phoneCode: '+44' },
    { name: 'France', code: 'FR', phoneCode: '+33' },
    { name: 'Italy', code: 'IT', phoneCode: '+39' },
    { name: 'Canada', code: 'CA', phoneCode: '+1' },
    { name: 'South Korea', code: 'KR', phoneCode: '+82' },
    { name: 'Australia', code: 'AU', phoneCode: '+61' },
    { name: 'Mexico', code: 'MX', phoneCode: '+52' },
    { name: 'Indonesia', code: 'ID', phoneCode: '+62' },
    { name: 'Netherlands', code: 'NL', phoneCode: '+31' },
    { name: 'Saudi Arabia', code: 'SA', phoneCode: '+966' },
    { name: 'Turkey', code: 'TR', phoneCode: '+90' },
    { name: 'Argentina', code: 'AR', phoneCode: '+54' },
    { name: 'Spain', code: 'ES', phoneCode: '+34' },
    { name: 'South Africa', code: 'ZA', phoneCode: '+27' },
    { name: 'Nigeria', code: 'NG', phoneCode: '+234' },
    { name: 'Pakistan', code: 'PK', phoneCode: '+92' },
    { name: 'Bangladesh', code: 'BD', phoneCode: '+880' },
    { name: 'Egypt', code: 'EG', phoneCode: '+20' },
    { name: 'Vietnam', code: 'VN', phoneCode: '+84' },
    { name: 'Philippines', code: 'PH', phoneCode: '+63' },
    { name: 'Colombia', code: 'CO', phoneCode: '+57' },
    { name: 'Thailand', code: 'TH', phoneCode: '+66' },
    { name: 'Malaysia', code: 'MY', phoneCode: '+60' },
  ];
  export const tabData = [
    {id: 1, tab: 'Chat'},
    {id: 2, tab: 'Story'},
    {id: 3, tab: 'Call'},
  ]
  export const indexMenuChat=[
    {
      id:1,
      optionText: 'New Group',
    },
    {
      id:2,
      optionText: 'New broadCast',
    },
    {
      id:3,
      optionText: 'Linked device',
    },
    {
      id:4,
      optionText: 'Starred messages',
    },
    {
      id:5,
      optionText: 'Payments',
    },
    {
      id:6,
      optionText: 'Settings',
    },
  ]
  export const indexMenuStory=[
    {
      id:1,
      optionText: 'Settings',
    },
    
  ]
  export const indexMenuCall=[
      {
        id:1,
        optionText: 'Clear Call Log',
      },
      {
        id:2,
        optionText: 'Settings',
      }
  ]
  export const settingList = [
    {
      id:1,
      lable:'Account',
      image: images?.key,
      data: 'Security notification, change number'
    },{
      id:2,
      lable:'Privacy',
      image: images?.lock,
      data: 'Block contacts, disappearing messages'
    },{
      id:3,
      lable:'Avatar',
      image: images?.account,
      data: 'Create, edit, profile, photo'
    },
    {
      id:4,
      lable:'Chats',
      image: images?.chat,
      data: 'Theme, wallpapers, chat, history'
    },
    {
      id:5,
      lable:'Notifications',
      image: images?.notification,
      data: 'Messages, group and Call tones'
    },
    {
      id:6,
      lable:'Storage and data',
      image: images?.storage,
      data: 'Network usage, auto-download'
    },
    {
      id:7,
      lable:'App Language',
      image: images?.language,
      data:  'devices language'
    },
    {
      id:8,
      lable:'Help',
      image: images?.help,
      data: 'Help Center, contact us, Privacy policy'
    },
    {
      id:9,
      lable:'Friends',
      image: images?.community,
      data: ''
    },
    
  ]