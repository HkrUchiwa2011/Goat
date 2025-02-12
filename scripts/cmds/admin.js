module.exports = {
    config: {
        name: "admin",
        version: "1.6",
        author: "NTKhang",
        countDown: 5,
        role: 2,
        description: {
            vi: "Thêm, xóa, sửa quyền admin",
            en: "Add, remove, edit admin role"
        },
        category: "box chat",
        guide: {
            vi: '{pn} [add | -a] <uid | @tag>: Thêm quyền admin cho người dùng'
                + '\n{pn} [remove | -r] <uid | @tag>: Xóa quyền admin của người dùng'
                + '\n{pn} [list | -l]: Liệt kê danh sách admin',
            en: '{pn} [add | -a] <uid | @tag>: Add admin role for user'
                + '\n{pn} [remove | -r] <uid | @tag>: Remove admin role of user'
                + '\n{pn} [list | -l]: List all admins'
        }
    },

    langs: {
        vi: {
            added: "✅ | Đã thêm quyền admin cho %1 người dùng:\n%2",
            alreadyAdmin: "\n⚠️ | %1 người dùng đã có quyền admin từ trước rồi:\n%2",
            missingIdAdd: "⚠️ | Vui lòng nhập ID hoặc tag người dùng muốn thêm quyền admin",
            removed: "✅ | Đã xóa quyền admin của %1 người dùng:\n%2",
            notAdmin: "⚠️ | %1 người dùng không có quyền admin:\n%2",
            missingIdRemove: "⚠️ | Vui lòng nhập ID hoặc tag người dùng muốn xóa quyền admin",
            listAdmin: "👑 | Danh sách admin:\n%1"
        },
        
        en: {
            added: [
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰✅ | Félicitations, tu as ajouté %1 admin(s). C’est une grande avancée pour quelqu’un qui confond encore un PDF avec une image.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰✅ | %1 admin(s) ajoutés. Ouais, c’est comme ça qu’on devient le maître du monde, non ? Tu as juste cliqué sur quelques boutons.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰✅ | Tu as enfin ajouté %1 admin(s). Si tu te félicites de ça, je vais pleurer.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰✅ | %1 admin(s) ajoutés. Est-ce que tu es aussi fier de cette réussite que quand tu as trouvé un autocollant sur ton cahier ?",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰✅ | %1 admin(s) ajoutés. Mais vraiment, t’as un diplôme pour ça ? Non, t’as juste fait ce qu’on t’a dit.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰✅ | Voilà, %1 admin(s) de plus. Maintenant, ferme-la, t’as pas fait grand-chose de spectaculaire.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰✅ | %1 admin(s) ajoutés. T’as vu ? C’était pas si compliqué. Mais bon, ça doit faire plaisir à quelqu'un comme toi."
            ],
            alreadyAdmin: [
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | %1 utilisateur(s) ont déjà le rôle d’administrateur. Félicitations, t’as découvert quelque chose d’évident.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | %1 admin(s) existent déjà. Oui, t’as fait ton boulot de manière exemplaire, à ce que je vois…",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | %1 admin(s) existent déjà. Bravo, tu as redécouvert la roue.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | %1 admin(s) sont déjà admins. Tu veux peut-être une médaille pour avoir remarqué ça ?",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | %1 utilisateur(s) sont déjà admins. C’est comme si tu essayais de vendre de l’eau en pleine mer.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | %1 admin(s) existent déjà. Ce n’est pas la fin du monde, mais pour toi ça doit être un grand choc.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | %1 admin(s) sont déjà admins. Je me demande si tu vas comprendre le concept un jour."
            ],
            missingIdAdd: [
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | T’as oublié l’ID ? Comment tu fais pour rater l’évidence à chaque fois ?",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | Encore une fois, tu oublies l’ID. T’as peut-être un trou de mémoire ou tu fais exprès ?",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | Tu vois, l’ID, c’est important. Essaie de t’en rappeler, ce serait cool.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | T’as encore oublié de mettre l’ID ? C’est pas si compliqué pourtant…",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | Ah, l’ID, c’est trop demander pour toi ? Vraiment ?",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | Tu sais, sans l’ID, on va vraiment tourner en rond. Il est où ? Dis-le moi.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | Je pensais que t’avais l’air intelligent, mais apparemment l’ID c’est trop compliqué pour toi."
            ],
            removed: [
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰✅ | %1 admin(s) supprimés. Bien joué, t’as enfin fait quelque chose de correct. C’était pas gagné.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰✅ | %1 admin(s) en moins. Et là, tu réalises que tu peux supprimer plus de choses que juste des admins.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰✅ | %1 admin(s) supprimés. Bien que tu sois toujours aussi mauvais à tout le reste, tu sembles faire ça correctement.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰✅ | %1 admin(s) supprimés. Si tu continues à faire ça, tu vas finir par croire que t’es utile.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰✅ | %1 admin(s) supprimés. Félicitations, tu as réussi à ne pas tout gâcher.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰✅ | %1 admin(s) supprimés. Eh bien, ce n’était pas aussi catastrophique que je le pensais.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰✅ | %1 admin(s) supprimés. Vraiment, tu penses que c’est un grand accomplissement ? T’es mignon.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰✅ | %1 admin(s) supprimés. Je suis choqué que tu n’aies pas fait de bêtise pendant ce processus."
            ],
            notAdmin: [
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | %1 utilisateur(s) n’ont pas le rôle d’administrateur. C’est un peu comme si tu pensais que t’étais utile… Mais non.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | %1 utilisateur(s) ne sont pas admins. Tu te demandes pourquoi ? Parce que t’es juste pas assez bien.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | %1 utilisateur(s) n’ont pas les droits admin. T’as vraiment cru que c’était toi qui décidais de tout ?",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | %1 utilisateur(s) n’ont pas les droits admin. T’as pas ce pouvoir, désolé, et tu ne l’auras jamais.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | %1 utilisateur(s) n’ont pas admin. T’as bien essayé, mais c’est pas pour tout le monde.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | %1 utilisateur(s) n’a pas admin. C’est un peu triste, mais pas tout le monde mérite ce rôle.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | %1 utilisateur(s) ne sont pas admins. Voilà, c’est dit, tu peux pleurer maintenant si ça te fait du bien."
            ],
            missingIdRemove: [
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | L’ID manque encore. C’est pas que tu te répètes, mais c’est fatigant à force.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | ID ou tag manquant, encore une fois. T’as des difficultés de mémoire ou c’est un choix ?",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | Ah, t’as encore oublié l’ID ? T’es vraiment un cas désespéré.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | Sérieusement, t’as encore oublié l’ID ? C’est pas la première fois, non ?",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | Comment tu peux encore oublier l’ID après tout ce temps ? T’es vraiment sans espoir.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | T’as encore oublié l’ID ? T’es sûr que t’as bien tout compris ici ?",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰⚠️ | T’as oublié l’ID ? Bien sûr, parce que toi, tu sais tout faire sauf ça."
            ],
            listAdmin: [
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰👑 | Liste des admins :\n%1\nAh, regarde cette liste. Pas de place pour toi. Désolé.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰👑 | Liste des admins :\n%1\nBien sûr, c’est une équipe d’élite. Et toi, bah, tu ne fais pas partie de ce groupe.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰👑 | Liste des admins :\n%1\nTu vois, les vrais admins sont ici. Regarde et pleure, si tu veux.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰👑 | Liste des admins :\n%1\nRegarde cette équipe brillante. Je sais, ça te fait mal de ne pas en faire partie.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰👑 | Liste des admins :\n%1\nT’as l’impression d’être utile, mais t’es juste un spectateur ici.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰👑 | Liste des admins :\n%1\nC’est beau, n’est-ce pas ? Dommage que tu ne sois pas dedans.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰👑 | Liste des admins :\n%1\nRegarde bien. Ce sont des gens qui savent ce qu’ils font. Pas toi.",
                "\n.   /)    /)───────◆\n.  (｡•ㅅ•｡)  ━╬٨ـﮩ𝕌𝕔𝕙𝕚𝕨𝕒𝕓𝕠𝕥ﮩ❤٨ـﮩﮩـ╬━\n╭∪─∪───────◆\n╰👑 | Liste des admins :\n%1\nTu rêves d’être dans cette liste ? Continue à rêver, ce n’est pas pour toi."
            ]
        }
    },

    onStart: async function ({ message, args, usersData, event, getLang }) {
        switch (args[0]) {
            case "add":
            case "-a": {
                if (args[1]) {
                    let uids = [];
                    if (Object.keys(event.mentions).length > 0)
                        uids = Object.keys(event.mentions);
                    else if (event.messageReply)
                        uids.push(event.messageReply.senderID);
                    else
                        uids = args.filter(arg => !isNaN(arg));
                    const notAdminIds = [];
                    const adminIds = [];
                    for (const uid of uids) {
                        if (config.adminBot.includes(uid))
                            adminIds.push(uid);
                        else
                            notAdminIds.push(uid);
                    }

                    config.adminBot.push(...notAdminIds);
                    const getNames = await Promise.all(uids.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
                    writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
                    
                    const randomResponses = [
                        "Bien joué, t'as ajouté des admins... Ou peut-être juste des gens que tu veux tyranniser. 😂",
                        "Ça y est, des admins. Attention, vous êtes maintenant sous leur domination... ou pas. 😏",
                        "Félicitations, tu as ajouté des admins ! On dirait que tu veux vraiment une armée de clones de toi. 😎",
                        "Ah, c'est ça ? Ajouter des admins ? Fais attention, sinon tu vas finir avec un gang de geeks. 🖥️",
                        "Tu te crois malin d'ajouter ces admins, mais je parie que même toi tu ne sais pas ce que tu fais. 😅",
                    ];

                    return message.reply(
                        (notAdminIds.length > 0 ? getLang("added", notAdminIds.length, getNames.map(({ uid, name }) => `• ${name} (${uid})`).join("\n")) : "")
                        + (adminIds.length > 0 ? getLang("alreadyAdmin", adminIds.length, adminIds.map(uid => `• ${uid}`).join("\n")) : "")
                        + `\n\n${randomResponses[Math.floor(Math.random() * randomResponses.length)]}`
                    );
                }
                else
                    return message.reply(getLang("missingIdAdd") + "\nTu veux ajouter un admin sans ID ? C'est mignon, mais ça ne marche pas comme ça. 😑");
            }
            case "remove":
            case "-r": {
                if (args[1]) {
                    let uids = [];
                    if (Object.keys(event.mentions).length > 0)
                        uids = Object.keys(event.mentions)[0];
                    else
                        uids = args.filter(arg => !isNaN(arg));
                    const notAdminIds = [];
                    const adminIds = [];
                    for (const uid of uids) {
                        if (config.adminBot.includes(uid))
                            adminIds.push(uid);
                        else
                            notAdminIds.push(uid);
                    }
                    for (const uid of adminIds)
                        config.adminBot.splice(config.adminBot.indexOf(uid), 1);
                    const getNames = await Promise.all(adminIds.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
                    writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));

                    const randomResponses = [
                        "Oups, tu as enlevé des admins ? Bravo, t’as bien réussi à ruiner leur journée. 😒",
                        "Tu as supprimé des admins, mais c'est peut-être une bonne idée... ou pas. L'avenir te le dira. 😏",
                        "Ah, tu veux enlever des admins ? Attends, ça va vraiment bouleverser l'ordre du monde ! 😂",
                        "Félicitations, tu viens de mettre le chaos dans la hiérarchie. L'univers te remercie. 🙃",
                        "Donc, tu as enlevé des admins... C'était peut-être des membres d'une société secrète, tu ne sais jamais. 😈",
                    ];

                    return message.reply(
                        (adminIds.length > 0 ? getLang("removed", adminIds.length, getNames.map(({ uid, name }) => `• ${name} (${uid})`).join("\n")) : "")
                        + (notAdminIds.length > 0 ? getLang("notAdmin", notAdminIds.length, notAdminIds.map(uid => `• ${uid}`).join("\n")) : "")
                        + `\n\n${randomResponses[Math.floor(Math.random() * randomResponses.length)]}`
                    );
                }
                else
                    return message.reply(getLang("missingIdRemove") + "\nTu veux supprimer des admins sans ID ? Ce n'est pas un jeu, faut être sérieux. 😅");
            }
            case "list":
            case "-l": {
                const getNames = await Promise.all(config.adminBot.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
                return message.reply(getLang("listAdmin", getNames.map(({ uid, name }) => `• ${name} (${uid})`).join("\n"))
                + `\n\nWow, quelle équipe de génies. T'as pas peur de trop briller ? 😎😂`);
            }
            default:
                return message.SyntaxError();
        }
    }
};
