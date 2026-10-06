import { useState, useEffect, useRef } from 'react';
import { Play, Square, MapPin, Type, Waves, Languages, ChevronDown } from 'lucide-react';

interface Sentence { id: number; text: string; english: string; }
interface RegionInfo { name: string; sentences: Sentence[]; }
interface Analysis { title: string; description: string; analysis: { points: string[] } }

const toAcademic = (text: string): string => {
  return text.replace(/kh/g, 'x').replace(/gh/g, 'ɣ').replace(/ch/g, 'ʃ').replace(/dh/g, 'ð').replace(/th/g, 'θ').replace(/jj/g, 'dʒ').replace(/q/g, 'q').replace(/3/g, 'ʕ');
}

const englishTranslations: Record<number, string> = {
1: 'One time I was barbecuing liver over charcoal and I completely burnt it.', 2: 'This kid never listens to what his dad tells him.', 3: 'We don\'t know what time it is',
4: 'Sometimes we eat meat, sometimes we eat sardines', 5: 'When will you go to the market?', 6: 'I want to go to America',
7: 'Our neighbor speaks to us', 8: 'Uncle Ibrahim, do you have 500 dirhams?', 9: 'Honestly I can\'t tell you everything',
10: 'This afternoon I will wear my djellaba', 11: 'Why are you covering your head uncle?', 12: 'Give me 100',
13: 'Mom, are you a little better?', 14: 'Is there no good water?', 15: 'I don\'t understand anything',
16: 'I really want to come with many friends', 17: 'Excuse me, can I ask you?', 18: 'Okay my dear, don\'t be sad',
19: 'Our black cow is very expensive', 20: 'Let me start by telling who came and who didn\'t', 21: 'We have many guests today',
22: 'I can\'t find work', 23: 'Bon appétit our brothers', 24: 'Today we cooked well', 25: 'One day a great man said',
26: 'I want to go back to the village', 27: 'Karim has a mustache', 28: 'Let\'s go this afternoon eat sardines',
29: 'Our neighbor left early today', 30: 'Come on Rachid, don\'t make me wait', 31: 'When will he come back?',
32: 'Uncle, how is the girl?', 33: 'Why didn\'t you come to work?', 34: 'The tent is called thaghmmerth',
35: 'We left Samir and we didn\'t say goodbye', 36: 'Today the girl asked in our village', 37: 'The training week is over',
38: 'Do you know what they call gas?', 39: 'Don\'t stay, we have work one day', 40: 'We must defend ourselves'
};

const playersData = [
  {name: 'Messi', bio: 'Argentine legend, 8x Ballon d\'Or. Master of control and precision.', points: ['Western uses strong "kh" sound like Messi\'s strong left foot', 'Central drops some vowels, similar to Messi\'s quick passes', 'Eastern adds "i" endings, like Messi\'s tricky dribbles', 'Beni Znassen keeps old words, like Messi keeps classic style']},
  {name: 'Ronaldo', bio: 'Portuguese machine. 5x Ballon d\'Or. Power and work ethic.', points: ['Western pronounces "r" hard, like Ronaldo\'s powerful shots', 'Central uses shorter words, Ronaldo is direct too', 'Eastern has French influence, Ronaldo played in France', 'Beni Znassen uses "gh" a lot, like Ronaldo\'s aggressive style']},
  {name: 'Neymar', bio: 'Brazilian magician. King of skills and creativity.', points: ['Western has musical tone, like Neymar\'s samba style', 'Central mixes words, Neymar mixes skills', 'Eastern is playful in tone, like Neymar\'s tricks', 'Beni Znassen is expressive, Neymar expresses with football']},
  {name: 'Mbappe', bio: 'French rocket. World Cup winner at 19. Speed.', points: ['Western speaks fast, like Mbappe\'s sprint', 'Central cuts words short, Mbappe is efficient', 'Eastern is modern, Mbappe represents new generation', 'Beni Znassen is direct, Mbappe goes straight to goal']},
  {name: 'Haaland', bio: 'Norwegian striker. Goal machine. Strength.', points: ['Western has heavy consonants, like Haaland\'s shots', 'Central is simple, Haaland is simple finisher', 'Eastern is loud, Haaland celebrates loud', 'Beni Znassen is physical, like Haaland\'s body']},
  {name: 'Lewandowski', bio: 'Polish poacher. Clinical and consistent.', points: ['Western is precise, like Lewa\'s finishing', 'Central is reliable, Lewa scores every game', 'Eastern is technical, Lewa has perfect technique', 'Beni Znassen is traditional, Lewa is classic #9']},
  {name: 'Benzema', bio: 'French artist. 2022 Ballon d\'Or. Elegant.', points: ['Western flows smoothly, like Benzema\'s touch', 'Central is intelligent, Benzema is smart player', 'Eastern is elegant, Benzema plays beautifully', 'Beni Znassen is experienced, Benzema is veteran']},
  {name: 'Salah', bio: 'Egyptian king. Fast and humble.', points: ['Western is quick, like Salah\'s pace', 'Central is humble, Salah is humble person', 'Eastern is hardworking, Salah works hard', 'Beni Znassen is respected, Salah is respected']},
  {name: 'De Bruyne', bio: 'Belgian brain. Best passer in the world.', points: ['Western has long words, like De Bruyne\'s long passes', 'Central is strategic, KDB thinks 2 steps ahead', 'Eastern is creative, KDB creates chances', 'Beni Znassen is accurate, KDB passing is accurate']},
  {name: 'Modric', bio: 'Croatian maestro. 2018 Ballon d\'Or.', points: ['Western is calm, Modric controls tempo', 'Central is experienced, Modric is veteran', 'Eastern is elegant, Modric touch is magic', 'Beni Znassen is wise, Modric is football brain']},
  {name: 'Kroos', bio: 'German metronome. Perfect passing.', points: ['Western is measured, Kroos passes are measured', 'Central is calm, Kroos never panics', 'Eastern is technical, Kroos technique is perfect', 'Beni Znassen is consistent, Kroos is always consistent']},
  {name: 'Kante', bio: 'French warrior. Covers whole pitch.', points: ['Western is energetic, Kante never stops running', 'Central is everywhere, Kante covers all areas', 'Eastern is humble, Kante is humble guy', 'Beni Znassen is tough, Kante is tough tackler']},
  {name: 'Van Dijk', bio: 'Dutch wall. Best defender.', points: ['Western is strong, Van Dijk is strong', 'Central is leader, Van Dijk is captain', 'Eastern is calm, Van Dijk is composed', 'Beni Znassen is commanding, Van Dijk commands defense']},
  {name: 'Ramos', bio: 'Spanish captain. Winner and fighter.', points: ['Western is aggressive, Ramos tackles hard', 'Central is clutch, Ramos scores important goals', 'Eastern is passionate, Ramos has passion', 'Beni Znassen is leader, Ramos is real captain']},
  {name: 'Courtois', bio: 'Belgian giant. 2.00m wall.', points: ['Western is tall, Courtois is tall', 'Central is safe, Courtois is safe hands', 'Eastern is big presence, Courtois fills goal', 'Beni Znassen is reliable, Courtois is reliable']},
  {name: 'Alisson', bio: 'Brazilian keeper. Great with feet.', points: ['Western is modern, Alisson is modern keeper', 'Central is calm, Alisson is calm', 'Eastern is technical, Alisson plays with feet', 'Beni Znassen is brave, Alisson comes out brave']},
  {name: 'Ter Stegen', bio: 'German captain. Barcelona wall.', points: ['Western is consistent, Ter Stegen is consistent', 'Central is leader, Ter Stegen is Barca captain', 'Eastern is reflexes, Ter Stegen has great reflexes', 'Beni Znassen is loyal, Ter Stegen is loyal to Barca']},
  {name: 'Donarumma', bio: 'Italian giant. Euro 2020 hero.', points: ['Western is young, Donarumma started young', 'Central is big, Donarumma is huge', 'Eastern is winner, Donarumma won Euro', 'Beni Znassen is pressure, Donarumma handles pressure']},
  {name: 'Son', bio: 'South Korean star. 2-footed.', points: ['Western is fast, Son is very fast', 'Central is 2-footed, Son shoots with both', 'Eastern is hardworking, Son works hard', 'Beni Znassen is humble, Son is humble']},
  {name: 'Kane', bio: 'English striker. Perfect technique.', points: ['Western is clinical, Kane finishes clinically', 'Central is smart, Kane is intelligent', 'Eastern is consistent, Kane scores every year', 'Beni Znassen is professional, Kane is professional']},
  {name: 'Griezmann', bio: 'French attacker. World Cup winner.', points: ['Western is clever, Griezmann is clever', 'Central is versatile, Griezmann plays many positions', 'Eastern is winner, Griezmann won World Cup', 'Beni Znassen is experienced, Griezmann is experienced']},
  {name: 'Pedri', bio: 'Spanish talent. Xavi\'s heir.', points: ['Western is young, Pedri is very young', 'Central is intelligent, Pedri has high IQ', 'Eastern is technical, Pedri touch is perfect', 'Beni Znassen is future, Pedri is future']},
  {name: 'Gavi', bio: 'Spanish fighter. Heart and energy.', points: ['Western is aggressive, Gavi fights hard', 'Central is passionate, Gavi has passion', 'Eastern is young, Gavi is teenager', 'Beni Znassen is brave, Gavi is brave']},
  {name: 'Vinicius', bio: 'Brazilian winger. Explosive pace.', points: ['Western is fast, Vinicius is fastest', 'Central is skillful, Vinicius has skills', 'Eastern is direct, Vinicius goes direct', 'Beni Znassen is exciting, Vinicius is exciting']},
  {name: 'Rodrygo', bio: 'Brazilian clutch. UCL specialist.', points: ['Western is clutch, Rodrygo scores in UCL', 'Central is calm, Rodrygo is calm under pressure', 'Eastern is talented, Rodrygo is talented', 'Beni Znassen is important, Rodrygo is important player']},
  {name: 'Foden', bio: 'English talent. "Stockport Iniesta".', points: ['Western is local, Foden is from Manchester', 'Central is technical, Foden technique is great', 'Eastern is young, Foden is young', 'Beni Znassen is creative, Foden is creative']},
  {name: 'Saka', bio: 'English winger. Arsenal star.', points: ['Western is consistent, Saka plays every game', 'Central is humble, Saka is humble', 'Eastern is talented, Saka is talented', 'Beni Znassen is important, Saka is important for Arsenal']},
  {name: 'Rice', bio: 'English midfielder. Defensive rock.', points: ['Western is strong, Rice is strong', 'Central is leader, Rice is captain', 'Eastern is hardworking, Rice works hard', 'Beni Znassen is reliable, Rice is reliable']},
  {name: 'Bellingham', bio: 'English wonderkid. Complete player.', points: ['Western is young, Bellingham is young', 'Central is complete, Bellingham does everything', 'Eastern is star, Bellingham is star', 'Beni Znassen is mature, Bellingham is mature']},
  {name: 'Odegaard', bio: 'Norwegian captain. Arsenal playmaker.', points: ['Western is creative, Odegaard creates chances', 'Central is captain, Odegaard is Arsenal captain', 'Eastern is technical, Odegaard technique is good', 'Beni Znassen is leader, Odegaard leads team']},
  {name: 'Mane', bio: 'Senegalese star. Hardworking.', points: ['Western is fast, Mane is fast', 'Central is hardworking, Mane works hard', 'Eastern is humble, Mane is humble', 'Beni Znassen is winner, Mane won UCL']},
  {name: 'Diaz', bio: 'Colombian winger. Fighter.', points: ['Western is aggressive, Diaz fights', 'Central is skillful, Diaz has dribbles', 'Eastern is passionate, Diaz has passion', 'Beni Znassen is energetic, Diaz has energy']},
  {name: 'Nunez', bio: 'Uruguayan striker. Powerful.', points: ['Western is powerful, Nunez is powerful', 'Central is aggressive, Nunez is aggressive', 'Eastern is fast, Nunez is fast', 'Beni Znassen is direct, Nunez plays direct']},
  {name: 'Jota', bio: 'Portuguese forward. Clinical finisher.', points: ['Western is clinical, Jota finishes well', 'Central is smart, Jota is intelligent', 'Eastern is consistent, Jota scores goals', 'Beni Znassen is important, Jota is important']},
  {name: 'Greaves', bio: 'English legend. Tottenham icon.', points: ['Western is legendary, Greaves is legend', 'Central is goalscorer, Greaves scored many', 'Eastern is classic, Greaves is classic striker', 'Beni Znassen is historic, Greaves is historic']},
  {name: 'Zidane', bio: 'French legend. 1998 World Cup hero.', points: ['Western is elegant, Zidane was elegant', 'Central is intelligent, Zidane was smart', 'Eastern is winner, Zidane won World Cup', 'Beni Znassen is master, Zidane was master']},
  {name: 'Ronaldinho', bio: 'Brazilian joy. King of tricks.', points: ['Western is joyful, Ronaldinho was joyful', 'Central is skillful, Ronaldinho had skills', 'Eastern is creative, Ronaldinho was creative', 'Beni Znassen is magic, Ronaldinho was magic']},
  {name: 'Rivaldo', bio: 'Brazilian left foot. 2002 WC winner.', points: ['Western is left-footed, Rivaldo had great left', 'Central is powerful, Rivaldo shots were powerful', 'Eastern is winner, Rivaldo won World Cup', 'Beni Znassen is talented, Rivaldo was talented']},
  {name: 'Cafu', bio: 'Brazilian right back. 3 World Cup finals.', points: ['Western is fast, Cafu was fast', 'Central is endurance, Cafu had endurance', 'Eastern is winner, Cafu won 2 World Cups', 'Beni Znassen is legend, Cafu is legend']},
  {name: 'Carlos', bio: 'Brazilian left back. Powerful free kicks.', points: ['Western is powerful, Carlos shots were powerful', 'Central is aggressive, Carlos was aggressive', 'Eastern is famous, Carlos free kick vs France', 'Beni Znassen is iconic, Carlos is iconic']}
];

const createSentences = (texts: string[]): Sentence[] => texts.map((text, index) => ({ id: index + 1, text: text, english: englishTranslations[index + 1] }));

const regionSentences: Record<string, Sentence[]> = {
  'Western Rif': createSentences(['aghroum n tinnourth itased yizidh ag zzith tahourrith','ijen thwarat ira kenfa thachwith kh lefhem okha thkemdhay.','Aharmoucha ouritesri qqa3 gha vavas min das iqqer.','ma thessirdhedh thanout nni ma 3adh? qa t3emmar s ikhechchiwen',' rrim dh ij n ousrem itawid g ssardhin','netsedjam kh qqa3 yenni i dhana itesran roukha','nich thoucha admerka hbach adh egga iharmouchen','agherravo nna ikhadred i3emmar s iserman','roukh oriqqim hed iterra leghrous n tazarth gerrif nna','dhiwchcha adqna ttekchita ino ghar thmeghra','lwalid innay marmi gha adasa ataf adh ssiwra akidek kh then3achin.','ya ychettihen, memmi 3emmas oritrih ghar chi n thmaghra sreghdha yeqqarsen','aqkom man dha gerrif,','amarwas bezzaf ouritsellik, bennaqes zzages ','lmaklaya dhaghes rmaq oyazidh dh djouz','Amezgharo ira idja ghri bezzaf dh imddokar','samhay 3afak archsseksikh','o dhak tesrich, querved ghri gha zdhath','thafounasth nna thaberkant th3iz khna','khari ourizemmar chi, tkhessath lmosa3ada sen bessah','Magha igha khaf kom derra lekhbar vra ma desna kifach?','ksi ndar akidhek zver nniy g thzouvayth','3afak ataf arzem chwitiy ssarjem nni.','morad iffegh yougour zik nhara bra ma dh ifdar','ourtijjachi yewdhan akh fek vvousren g tiktok','adhraha adhrowha ghar thaddarth zik thwarata','odji amya dhas teggen yergazen nhar i tichchen awar i hed ','adasa dhiwchcha adhchcha ssardhin','ma gharna dha chin oksum i reghda nigh anegh re3dhes waha','Ajjay a roshdi odhay tejjachi adh 3asva','man thsa33at igha dyeffegh lcar nigar amarwas?','sbah rkhir awmathna, mokh thedjidh chwiti?','ghir ad kemra zi rkhedmath ataf achkoum d ttev3a ghar lmal3ab ','nich aqay gui lmadrasa qqaregh o remdha thmazighth ','wen gha yezghouren dh amezgharo atiksi','roukha thfouyth tesseqsiq gharna g dchar','thagzirtha tanitiy tawdharen ghres s thgherravout waha','ossina mok qqarnas i wargaza?','ourtheqqimchi gna themzi nni ira gna ijen nhar','ogharna mizi gha ndhafe3 kh ikhfenna']),
  'Central Rif': createSentences(['aghoum n tinoath itased yizidh ag zzith tahoarith','ijen thwara ira kenfegh thachwith kh refhem okha thkemday.','ahamoucha oytesri qa3 gha vavas min dhas iqqa.','ma thesyadhedh thanout nni ma 33adh? qa thechchou s ikhachchiwen.','arim dh ij n wosrem itawid gui ssadhin ','netsedjam kh kourchi yenni i dhanegh itesran roukha','nich touchegh adhmerkegh bach adh ggeghe ihamouchen','agharavo nnegh ikhechched i 3emma s iserman ','roukh ogu iqqim hed itara reghrous n tazath g arif nnegh','dhiwchcha adknegh ttekchita ino gha thmeghra','lwalid innay marmi gha ad asegh ataf akidek ssiwregh kh then3achin.','ya ychettihen mmi 3emmas oytrah gha chi n thmaghra sreghdha yeqqasen','aqachkoum min dha g arif','amawas dounnith ouytsellik, vnaqes zgues','lmaklaya ghes rmaq oyazidh dh djouz','Amezgharo ira ghay imeddokar dounnith ','samhay 3afak achsseksigh','o dhak tesrigh qarved ghay a zdhath','thafounasth nnegh thabarkant th3iz khnegh','khari ouyezmachi  tkhessas rmosa3ada s elma3qoul','Magha igha khkoum daregh rekhva vra ma desnegh moukas?','ksi nda akik vasura nni gui thzouvayth','3afak atfi azem chwit ssajem nni','morad yeffegh youga zik nhara vra ma dh yefdha','otijjachi iwdhan akhak vousan ghi tiktok','adhahegh adhaowhegh gha thaddath zik twaraya','odjichi amya i dhas teggen yagazen nha i tichchen awar i hed ','adasegh dhiwchcha adhchchegh ssadhin','ma ghanegh dha cho ksumi i wezghen ha nigh anegh re3dhes waha','Ajjay a roshdi odhay tejjachi adh 3asvegh','man thsa33et igha dyeffegh rcar niga mawas?','svah rkhi awmathnegh, mok thgidh chwit?','ghir ad kemregh zi rkhedmeth ataf achkoum d ttev3egh gha forvo','nech aqay gui lmedrasa qqagh o remdhegh thmazighth','wen gha yeswan dh amezgharo atiksi','roukh thfouyth tesseqsiq ghanegh gui dcha','thagzatha tanitiy tawdhen ghas s thgharavout waha','ossinegh mok dhasqqan i wagaza?','outheqqimchi gnegh themzi nni ira gnegh ijen nha','oghanegh mizi gha ndhafe3 kh ikhfennegh']),
  'Eastern Rif': createSentences(['aghroum n thafeqqount ittased yizidh ag zzecht ttabeldechth','ij omoa ira chenfegh tsa kh refhem ocha tchemdhayi.','ahrama waytesricha mmarra gha vavas mein das ieqqa, marra.','ma thisyadhedh thhanet nni nikh 3adh? qa th3emma s injan ','arim dh ijjen wosrem itawyed dhi ssadhin','netsedjam kh marra yenni dhaynekh yeshissan rekhkho','nich tekhsekh adhmerchekh hima dheggekh ihenjan','agharravo nnekh ikhedhred i 3emma s isrman','rekhkho wayeqqim hed itarra reghrous n tazath g arif nnekh','dhiwchcha adyadegh ttekchita ino gha ourar','lwalid yennayi warmi gha ad gha yasekh ataf akidech ssiwrekh kh tmenyath.','majd ikharriqen,mmi 3emmas wayetrih gha cha n ourar sarroudh yeqqasen','aqqawem mein da dhi arrif','amarwas attas waytsellik,tougha vnaqes zzayes','machchaya dhayes arwa oyazidh dh ddouz','Amezwaro tougha ira idja ghari attas dh i3chan','wadhmayi 3afak achsseksikh','wa dhach tesrikh, qarved ghari a zzath','thafounasth nnekh thabarchant th3iz khanekh','khari wayezmacha, tkhissas lmosa3ada s ttidhet','mayemmi igha khawem darregh rekhvar vra ma desnekh mamech?','iysi nda kidech azvag nni dhi thzouvacht','3afak ataf azem chwayt rkazi nni.','morad yeffegh youya zich nhara bra ma adh yayyeq','watijjacha iwdhan akhach hechchen dhi tiktok','adhrahekh adhawhekh gha thaddath zich twartta','wadjicha yammo idhas tteggen yaryazen nha i ttichchen awar i chan hed','adasekh dhiwchcha adhchchekh ssadhin','ma ghanekh dha chan weysoum iw mechri nikh aneg re3dhes waha','Ajjayi a roshdi wadhayi ttejjacha adh 3asvekh','man this33et igha dgha yeffegh rcar n igamawas?','sbah rkha awmathnekh mamech ithdjidh chwayt?','tougha ghir ad kemrekh zi rkhedmath ataf aknniw d dhfakh gha lmal3ab','nech aaqay dhi lmedrasa qqakh o remdhekh thmazighth','wen gha yezzan dh amezwaro atiysi','rekhkho thfouchth tesseqsiq ghanekh dhi dcha','thigzatha tanita ttawdhen ghas s thgharravout waha','wassinekh mmamech dhasqqan i waryaza?','watheqqimcha dhaynekh themzi nni ira dhaynekh ijen nha','waghanekh mizi gha ndhafe3 kh ikhfennekh']),
  'Beni Znassen Region': createSentences(['aghroum n thafeqqount ittased yizidh ag zzecht ttabeldechth','idjen thwarat ira kenfegh tsa kh refhem ocha tkemday','arava yo ortesla gh vavas min das iqqar','ma thisyadhedh thhanet nni nikh 3adh? qa th3emma s injan','arim dh ij n wosrem itawyed dhi ssardhin','netsellam kh marra inni daynekh tteslan rekhkho','nich tekhsekh adhmerchekh hima dheggekh ihenjan','agharravo nnekh ikhedhred i 3emma s isrman','roukh iriqqim hed iterra leghrous n tazarth gerrif nnegh','dhiwtchcha adyadegh ttekchita ino ghar ourar','lwalid innayi warmi gha ad gha yasekh ataf adh ssiwrekh kidech kh tmenyath.','majd ikharriqen,mmi 3emmas wayetrih gha cha n ourar sarroudh yeqqasen','aqqawem mein da dhi arrif','amarwas attas waytsellik,tougha vnaqes zzayes','machchaya dhayes arwa oyazidh dh llouz','Amazwaro tougha nich ira ijja ghari bezzaf dh imddokal','wadhmayi 3afak achsseksikh','or dhak tslligh qerved ghri auro','thafounasth nnekh thabarchant th3iz khanekh','khari wayezmarcha, tkhissas lmosa3ada s ttidhet','mayemmi igha khawem darregh rekhvar vra ma desnekh mamech?','iysi nda kidech azvag nni dhi thzouvacht','3afak ataf chwayt thvourjet nni.','morad yeffegh youya zich nhara bra ma adh yayyeq','ourtijjachi yewdhan akh fek vousren gui tiktok','adhrahekh adhawhekh gha thaddath zich twartta','ourdji yammo idhas tteggen yargazen nhar i ttichchen awal i chan hed','adasegh dhiwtchcha adetchegh sadhin','ma ghranegh dha chan weysoum iw machri nikh aneg re3dhes waha','Ajjayi a roshdi wadhayi ttejjacha adh 3asvekh','man this33et igha dgha yeffegh rcar n igamawas?','sbah lkhir awmathnekh mamech ithdjidh chwayt?','tougha ghir ad kemrekh zi rkhedmath ataf aknniw d dhfakh  gha lmal3ab','natch qayi dhi lmadrasa qqaregh o lamdhagh thmazighth','wen gha yizzan dh amezwaro atiysi','roukh thfouchth tesseqsiq ghanekh dhi dcha','thigzatha tanita ttawdhen ghas s thgharravout waha','wassinekh mmametch dhasqqan i waryaza?','watheqqimcha dhaynekh themzi nni ira dhaynekh ijen nhar','waghanekh mizi gha ndhafe3 kh ikhfennegh'])
};

const linguisticAnalysisData: Record<number, Analysis> = {};
for (let sentenceId = 1; sentenceId <= 40; sentenceId++) {
  const player = playersData[sentenceId - 1];
  linguisticAnalysisData[sentenceId] = {
    title: `[${player.name}] Analysis for Sentence ${sentenceId}: "${englishTranslations[sentenceId]}"`,
    description: `About ${player.name}: ${player.bio}`,
    analysis: { points: [`**[${player.name} - Western]** ${player.points[0]}`, `**[${player.name} - Central]** ${player.points[1]}`, `**[${player.name} - Eastern]** ${player.points[2]}`, `**[${player.name} - Beni Znassen]** ${player.points[3]}`, `**Note**: This is temporary placeholder. Replace with real linguistic data later`] }
  };
}

const regionNameMapper: Record<string, string> = { 'Western': 'Western Rif', 'Central': 'Central Rif', 'Eastern': 'Eastern Rif', 'Beni Znassen': 'Beni Znassen Region' };
const dialectOffset: Record<string, number> = { 'Western Rif': 0, 'Central Rif': 1, 'Eastern Rif': 2, 'Beni Znassen Region': 3 };
const dialectList = ['Western Rif', 'Central Rif', 'Eastern Rif', 'Beni Znassen Region'] as const;

interface Props { selectedRegion: string | null; }

const RegionDetails = ({ selectedRegion }: Props) => {
  const [selectedSentenceId, setSelectedSentenceId] = useState(1);
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => { setSelectedSentenceId(1); }, [selectedRegion]);
  if (!selectedRegion) return <div className="min-h-[400px] flex items-center justify-center"><h2 className="text-2xl font-bold">Select a Region from the Map</h2></div>;

  const mappedRegionName = regionNameMapper[selectedRegion] || selectedRegion;
  const region = regionsData[mappedRegionName];
  if (!region) return <div className="text-red-600 p-4">Error: Region Not Found</div>;

  const currentAnalysis = linguisticAnalysisData[selectedSentenceId];
  const getSentenceById = (dialect: string, id: number) => regionSentences[dialect].find(s => s.id === id)!;

  const AUDIO_FOLDER = "/videos/";
  const getAudioPath = (dialect: string, sentenceId: number) => {
    const offset = dialectOffset[dialect];
    const fileNumber = ((sentenceId - 1) * 4) + offset + 1;
    const formattedId = String(fileNumber).padStart(3, '0');
    return `${AUDIO_FOLDER}${formattedId}.wav`;
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current!.pause();   
      audioRef.current!.currentTime = 0; //
    }
    setPlayingKey(null);
  }

  const handlePlayAudio = (dialect: string, sentenceId: number) => {
    const key = `${dialect}-${sentenceId}`;
    if (playingKey === key) { handleStopAudio(); return; }
    handleStopAudio();
    const audioPath = getAudioPath(dialect, sentenceId);
    audioRef.current = new Audio(audioPath);
    audioRef.current.play().then(() => setPlayingKey(key)).catch((e) => {
        console.error("Audio ERROR:", e);
        alert("Error playing audio: " + audioPath);
        setPlayingKey(null);
      });
    audioRef.current.onended = () => setPlayingKey(null);
  }

  return (
    <div className="space-y-12 py-8 px-4">
      <h1 className="text-4xl font-bold text-center">{region.name}</h1>
      <div className="bg-white rounded-3xl border border-navy/10 shadow-[0_20px_60px_-30px_rgba(15,42,92,0.25)] p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/15 text-navy text-xs font-semibold tracking-wider uppercase mb-3">
              <Languages size={14} />
              Dialect Comparison
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-deep tracking-tight">Dialect Comparison Table</h2>
          </div>
          <div className="w-full md:w-80">
            <label htmlFor="sentence-select" className="block text-xs font-semibold tracking-wider uppercase text-slate-brand mb-2">
              Sentence
            </label>
            <div className="relative">
              <select
                id="sentence-select"
                className="w-full appearance-none p-3 pr-10 rounded-xl border-2 border-navy/15 bg-white text-base text-foreground focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy/40 transition-colors"
                value={selectedSentenceId}
                onChange={(e) => setSelectedSentenceId(Number(e.target.value))}
              >
                {region.sentences.map(s => <option key={s.id} value={s.id}>{s.id}. {s.english}</option>)}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy/60" />
            </div>
          </div>
        </div>

                {/* Dialect Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-navy/10 shadow-sm">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-navy text-white">
                <th className="text-left px-5 py-4 font-semibold tracking-wider uppercase text-[11px] w-36 border-r border-white/10">
                  <div className="flex items-center gap-2">
                    <Type size={13} />
                    Field
                  </div>
                </th>
                {dialectList.map(dialect => {
                  const isActive = mappedRegionName === dialect;
                  const shortName = dialect.replace(' Rif', '').replace(' Region', '');
                  return (
                    <th
                      key={dialect}
                      className={`px-5 py-4 text-left font-semibold tracking-wide text-[13px] border-r border-white/10 last:border-r-0 ${
                        isActive? 'bg-white/15' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${
                          isActive? 'bg-amber-300' : 'bg-white/40'
                        }`} />
                        <span>{shortName}</span>
                        {isActive && (
                          <span className="ml-1 px-2 py-0.5 rounded-full bg-amber-300 text-navy text-[9px] font-bold tracking-wider uppercase">
                            Selected
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {/* Row 1: Transcription */}
              <tr className="border-b border-navy/8 bg-white hover:bg-navy/[0.02] transition-colors">
                <td className="px-5 py-4 border-r border-navy/8">
                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase text-slate-brand">
                    <Type size={12} className="text-navy/60" />
                    Transcription
                  </div>
                </td>
                {dialectList.map(dialect => {
                  const s = getSentenceById(dialect, selectedSentenceId);
                  const isActive = mappedRegionName === dialect;
                  return (
                    <td
                      key={dialect}
                      className={`px-5 py-4 border-r border-navy/8 last:border-r-0 align-top ${
                        isActive? 'bg-navy/[0.03]' : ''
                      }`}
                    >
                      <p className="text-base font-medium text-foreground leading-relaxed break-words">{s.text}</p>
                    </td>
                  );
                })}
              </tr>

              {/* Row 2: Academic */}
              <tr className="border-b border-navy/8 bg-slate-50/60 hover:bg-navy/[0.02] transition-colors">
                <td className="px-5 py-4 border-r border-navy/8">
                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase text-slate-brand">
                    <Waves size={12} className="text-navy/60" />
                    Academic
                  </div>
                </td>
                {dialectList.map(dialect => {
                  const s = getSentenceById(dialect, selectedSentenceId);
                  const isActive = mappedRegionName === dialect;
                  return (
                    <td
                      key={dialect}
                      className={`px-5 py-4 border-r border-navy/8 last:border-r-0 align-top ${
                        isActive? 'bg-navy/[0.03]' : ''
                      }`}
                    >
                      <p className="font-mono text-[13px] text-navy bg-navy/5 border border-navy/10 rounded-lg px-3 py-2 break-words leading-relaxed">{toAcademic(s.text)}</p>
                    </td>
                  );
                })}
              </tr>

              {/* Row 3: Translation */}
              <tr className="border-b border-navy/8 bg-white hover:bg-navy/[0.02] transition-colors">
                <td className="px-5 py-4 border-r border-navy/8">
                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase text-slate-brand">
                    <Languages size={12} className="text-navy/60" />
                    Translation
                  </div>
                </td>
                {dialectList.map(dialect => {
                  const s = getSentenceById(dialect, selectedSentenceId);
                  const isActive = mappedRegionName === dialect;
                  return (
                    <td
                      key={dialect}
                      className={`px-5 py-4 border-r border-navy/8 last:border-r-0 align-top ${
                        isActive? 'bg-navy/[0.03]' : ''
                      }`}
                    >
                      <p className="italic text-[13px] text-slate-brand leading-relaxed">{s.english}</p>
                    </td>
                  );
                })}
              </tr>

              {/* Row 4: Audio */}
              <tr className="bg-slate-50/60 hover:bg-navy/[0.02] transition-colors">
                <td className="px-5 py-4 border-r border-navy/8">
                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase text-slate-brand">
                    <Play size={12} className="text-navy/60" />
                    Audio
                  </div>
                </td>
                {dialectList.map(dialect => {
                  const key = `${dialect}-${selectedSentenceId}`;
                  const isPlaying = playingKey === key;
                  const isActive = mappedRegionName === dialect;
                  return (
                    <td
                      key={dialect}
                      className={`px-5 py-4 border-r border-navy/8 last:border-r-0 ${
                        isActive? 'bg-navy/[0.03]' : ''
                      }`}
                    >
                      <button
                        onClick={() => handlePlayAudio(dialect, selectedSentenceId)}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95 ${
                          isPlaying
                           ? 'bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-200'
                            : 'bg-navy hover:bg-navy-deep shadow-sm shadow-navy/20'
                        }`}
                      >
                        {isPlaying? <Square size={13} /> : <Play size={13} />}
                        {isPlaying? 'Stop' : 'Play'}
                      </button>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

                {currentAnalysis && (
          <div className="mt-10 p-6 md:p-8 rounded-2xl border border-navy/15 bg-gradient-to-br from-navy/[0.05] to-white">
            <h3 className="text-xl md:text-2xl font-bold mb-3 text-navy-deep">{currentAnalysis.title}</h3>
            <p className="italic mb-5 text-slate-brand bg-white p-3 rounded-lg border border-navy/10">⚽ {currentAnalysis.description}</p>
            <ul className="space-y-3">
              {currentAnalysis.analysis.points.map((p: string, i: number) => (
                <li key={i} className="text-base bg-white p-3 rounded-lg border border-navy/10 flex gap-2">
                  <span className="text-navy shrink-0">▸</span>
                  <span dangerouslySetInnerHTML={{__html: p}}/>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const regionsData: Record<string, RegionInfo> = {
  'Western Rif': { name: 'Western Rif', sentences: regionSentences['Western Rif'] },
  'Central Rif': { name: 'Central Rif', sentences: regionSentences['Central Rif'] },
  'Eastern Rif': { name: 'Eastern Rif', sentences: regionSentences['Eastern Rif'] },
  'Beni Znassen Region': { name: 'Beni Znassen Region', sentences: regionSentences['Beni Znassen Region'] }
};
export default RegionDetails;