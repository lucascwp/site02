import { useState, useEffect, useRef } from "react";
import {
  Car, Bike, Home, Truck, Briefcase, MessageCircle,
  ChevronDown, ChevronUp, Shield, Users, Star, CheckCircle,
  Phone, ArrowRight, BadgeCheck, Handshake, TrendingUp,
  ClipboardList, Search, ThumbsUp, Lightbulb, Zap, Award,
  HeartHandshake, Calendar, ChevronRight,
} from "lucide-react";

// ─── CONFIG ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "5541999770344";
const WHATSAPP_MSG = encodeURIComponent(
  "Olá, Rovis! Vim pelo seu site e gostaria de saber mais sobre consórcio."
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

// ─── CORES SERVOPA ─────────────────────────────────────────────────────────
// Vermelho institucional Servopa + neutros escuros premium
const C = {
  red:     "#C8102E",   // vermelho Servopa
  redDark: "#A00E25",
  redGlow: "rgba(200,16,46,0.15)",
  dark:    "#0D0D0D",
  dark2:   "#161616",
  dark3:   "#1F1F1F",
  card:    "#222222",
  border:  "rgba(255,255,255,0.08)",
  muted:   "rgba(255,255,255,0.5)",
  dimmed:  "rgba(255,255,255,0.25)",
  white:   "#FFFFFF",
  green:   "#22C55E",
  greenDk: "#16A34A",
};

const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,700&family=Barlow+Condensed:wght@700;800;900&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:'Barlow',sans-serif;background:${C.dark};color:${C.white};-webkit-font-smoothing:antialiased;}
  a{text-decoration:none;color:inherit;}
  ::selection{background:${C.red};color:#fff;}
  html{scroll-behavior:smooth;}
`;

// ─── COMPONENTES BASE ──────────────────────────────────────────────────────

function WaBtn({ label = "Falar no WhatsApp", size = "md", full = false }) {
  const pad = size === "lg" ? "18px 36px" : size === "sm" ? "10px 20px" : "13px 26px";
  const fs  = size === "lg" ? 17 : size === "sm" ? 13 : 15;
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: C.green, color: "#fff",
        fontFamily: "'Barlow',sans-serif", fontWeight: 700,
        fontSize: fs, padding: pad, borderRadius: 100,
        transition: "background .2s, transform .15s",
        width: full ? "100%" : undefined, justifyContent: full ? "center" : undefined,
        boxShadow: "0 4px 24px rgba(34,197,94,.3)",
      }}
      onMouseOver={e => { e.currentTarget.style.background = C.greenDk; e.currentTarget.style.transform = "scale(1.03)"; }}
      onMouseOut={e => { e.currentTarget.style.background = C.green; e.currentTarget.style.transform = "scale(1)"; }}
    >
      <MessageCircle size={fs + 1} />
      {label}
    </a>
  );
}

function RedBtn({ label, href = "https://www.consorcioservopa.com.br" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: C.red, color: "#fff",
        fontFamily: "'Barlow',sans-serif", fontWeight: 700,
        fontSize: 15, padding: "13px 26px", borderRadius: 100,
        transition: "background .2s, transform .15s",
      }}
      onMouseOver={e => { e.currentTarget.style.background = C.redDark; e.currentTarget.style.transform = "scale(1.03)"; }}
      onMouseOut={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.transform = "scale(1)"; }}
    >
      {label} <ArrowRight size={16} />
    </a>
  );
}

function Tag({ children }) {
  return (
    <span style={{
      display: "inline-block",
      background: C.redGlow, color: C.red,
      border: `1px solid rgba(200,16,46,.3)`,
      fontFamily: "'Barlow',sans-serif", fontWeight: 700,
      fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
      padding: "5px 14px", borderRadius: 100, marginBottom: 18,
    }}>
      {children}
    </span>
  );
}

function SectionTitle({ tag, title, sub, light = false, center = false }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", maxWidth: center ? 680 : undefined, margin: center ? "0 auto 56px" : "0 0 48px" }}>
      {tag && <Tag>{tag}</Tag>}
      <h2 style={{
        fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900,
        fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.05,
        color: light ? "#fff" : "#fff",
        textTransform: "uppercase", letterSpacing: "-0.01em",
      }}>
        {title}
      </h2>
      {sub && <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.7, marginTop: 12 }}>{sub}</p>}
    </div>
  );
}

// ─── DADOS ─────────────────────────────────────────────────────────────────

const CONSORCIOS = [
  { icon: Car,       titulo: "Carros",    desc: "Planeje a compra do seu veículo novo ou seminovo com parcelas acessíveis e sem juros tradicionais." },
  { icon: Bike,      titulo: "Motos",     desc: "Conquiste sua moto de forma organizada, encaixando as parcelas no seu orçamento mensal." },
  { icon: Home,      titulo: "Imóveis",   desc: "O caminho planejado para realizar o sonho da casa própria ou investir em um imóvel." },
  { icon: Truck,     titulo: "Caminhões", desc: "Renove sua frota com inteligência financeira. Ideal para transportadores e autônomos." },
  { icon: Briefcase, titulo: "Empresas",  desc: "Invista no crescimento do seu negócio com uma solução de crédito planejada e eficiente." },
];

const DIFERENCIAIS = [
  { icon: Handshake,     titulo: "Atendimento consultivo",   desc: "Ouve antes de indicar qualquer produto. O foco é sempre no seu objetivo real." },
  { icon: Shield,        titulo: "Transparência total",      desc: "Sem letras miúdas escondidas. Cada etapa é explicada com clareza desde o início." },
  { icon: Award,         titulo: "Referência em Curitiba",   desc: "Um dos consultores com maior volume de vendas e satisfação de clientes na cidade." },
  { icon: HeartHandshake,titulo: "Acompanhamento contínuo", desc: "O suporte não acaba na contratação. Você tem um consultor do seu lado na jornada toda." },
];

const PASSOS = [
  { icon: Phone,        num: "01", txt: "Você manda mensagem no WhatsApp" },
  { icon: Search,       num: "02", txt: "Ele entende seu objetivo e momento financeiro" },
  { icon: ClipboardList,num: "03", txt: "Apresenta a opção mais adequada para você" },
  { icon: Lightbulb,    num: "04", txt: "Você tira todas as dúvidas sem pressão" },
  { icon: ThumbsUp,     num: "05", txt: "Inicia seu planejamento com segurança" },
];

const DEPOIMENTOS = [
  { nome: "Carlos M.", cargo: "Cliente · Consórcio de Carros",    texto: "Recebi um atendimento muito claro e sem pressão. Entendi o produto de verdade antes de tomar qualquer decisão. Nota dez." },
  { nome: "Ana L.",    cargo: "Cliente · Consórcio de Imóveis",   texto: "Estava em dúvida se consórcio era pra mim. Depois de uma conversa esclarecedora, ficou tudo claro. Me senti bem orientada do início ao fim." },
  { nome: "Marcos T.", cargo: "Cliente · Consórcio de Caminhões", texto: "Procurava uma alternativa ao financiamento e a opção apresentada fez total sentido pro meu negócio. Atendimento muito profissional." },
];

const FAQS = [
  { p: "O que é consórcio?", r: "Consórcio é uma modalidade de compra planejada em que um grupo de pessoas contribui mensalmente para formar um fundo. Periodicamente, um ou mais participantes são contemplados com o crédito para adquirir o bem desejado — seja por sorteio ou por lance." },
  { p: "Consórcio tem juros?", r: "Não há juros como no financiamento tradicional. O consórcio cobra uma taxa de administração, que costuma tornar o custo total significativamente menor em comparação ao crédito convencional." },
  { p: "Como funciona a contemplação?", r: "A contemplação ocorre mensalmente, por sorteio nas assembleias do grupo ou por lance — quando o participante oferta um percentual do crédito para ser contemplado antes. Não há garantia de data específica para a contemplação." },
  { p: "Posso dar lance?", r: "Sim. O lance é uma oferta feita para antecipar a contemplação. Existem diferentes modalidades de lance que variam conforme as regras de cada plano. O Rovis pode explicar como funciona em detalhes." },
  { p: "Quais bens posso adquirir?", r: "Com o Consórcio Servopa você pode planejar a compra de carros, motos, caminhões, imóveis e também soluções para empresas. Rovis apresenta as opções disponíveis conforme o seu objetivo." },
  { p: "Como falo com o Rovis?", r: "O caminho mais rápido é pelo WhatsApp. Clique em qualquer botão verde desta página e inicie uma conversa diretamente com ele agora mesmo." },
];

// ─── SEÇÕES ────────────────────────────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {FAQS.map((faq, i) => (
        <div
          key={i}
          onClick={() => setOpen(open === i ? null : i)}
          style={{
            border: `1px solid ${open === i ? "rgba(200,16,46,.5)" : C.border}`,
            borderRadius: 16, overflow: "hidden",
            background: open === i ? "rgba(200,16,46,.06)" : C.card,
            transition: "border-color .2s, background .2s", cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 24px", gap: 16 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>{faq.p}</span>
            {open === i
              ? <ChevronUp size={18} style={{ color: C.red, flexShrink: 0 }} />
              : <ChevronDown size={18} style={{ color: C.dimmed, flexShrink: 0 }} />}
          </div>
          {open === i && (
            <div style={{ padding: "0 24px 20px", color: C.muted, fontSize: 14, lineHeight: 1.75, borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
              {faq.r}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── MAIN ──────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <style>{globalStyle}</style>

      {/* ── NAV ────────────────────────────────────────────────────────── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(13,13,13,.92)", backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px clamp(20px,5vw,80px)",
      }}>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 24, letterSpacing: "-0.03em" }}>
            <span style={{ color: C.red }}>R</span>
            <span style={{ color: "#fff" }}>Nunes</span>
          </span>
          <span style={{ fontSize: 10, color: C.dimmed, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            Consórcio Servopa
          </span>
        </div>
        <WaBtn label="WhatsApp" size="sm" />
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section style={{
        background: C.dark2,
        padding: "clamp(60px,10vh,120px) clamp(20px,5vw,80px)",
        position: "relative", overflow: "hidden",
        minHeight: "92vh", display: "flex", alignItems: "center",
      }}>
        {/* Decorative red glow */}
        <div style={{
          position: "absolute", top: "-10%", right: "-5%",
          width: "55%", height: "70%",
          background: "radial-gradient(ellipse at top right, rgba(200,16,46,.18) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        {/* Grid lines decoration */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "60px 60px", pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: 1200, width: "100%", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", gap: "clamp(32px,6vw,80px)", alignItems: "center" }}>
          {/* LEFT */}
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              <Tag>Consórcio Servopa · Curitiba, PR</Tag>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(245,158,11,.12)", color: "#F59E0B",
                border: "1px solid rgba(245,158,11,.3)",
                fontFamily: "'Barlow',sans-serif", fontWeight: 700,
                fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "5px 14px", borderRadius: 100, marginBottom: 18,
              }}>
                <Star size={11} fill="#F59E0B" /> Top vendedor em Curitiba
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900,
              fontSize: "clamp(44px,8vw,86px)", lineHeight: 0.95,
              textTransform: "uppercase", letterSpacing: "-0.02em",
              marginBottom: 28,
            }}>
              REALIZE<br />
              SEU PLANO<br />
              <span style={{ color: C.red }}>COM SEGURANÇA</span>
            </h1>

            <p style={{ color: C.muted, fontSize: "clamp(15px,1.6vw,18px)", lineHeight: 1.7, maxWidth: 540, marginBottom: 36 }}>
              Consultor especializado em consórcio Servopa, com uma das maiores carteiras de clientes de Curitiba. Aqui você encontra a opção certa para conquistar seu carro, imóvel, moto ou fazer seu negócio crescer — com clareza e sem pressão.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 48 }}>
              <WaBtn size="lg" label="Falar no WhatsApp" />
              <RedBtn label="Ver opções de consórcio" />
            </div>

            {/* Selos */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { icon: Award,      txt: "Um dos melhores de Curitiba" },
                { icon: TrendingUp, txt: "Experiência em vendas" },
                { icon: Users,      txt: "Grande carteira de clientes" },
              ].map(({ icon: Icon, txt }) => (
                <div key={txt} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: C.dark3, border: `1px solid ${C.border}`,
                  borderRadius: 100, padding: "9px 16px",
                  fontSize: 13, color: C.muted, fontWeight: 600,
                }}>
                  <Icon size={14} style={{ color: C.red }} />
                  {txt}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT – placeholder foto */}
          <div style={{
            width: "clamp(220px,26vw,320px)", aspectRatio: "3/4",
            borderRadius: 24, overflow: "hidden",
            background: C.card, border: `1px solid ${C.border}`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 12, color: C.dimmed, flexShrink: 0,
            position: "relative",
          }}>
            {/* Red accent bar */}
            <div style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: 4, background: C.red, borderRadius: "0 4px 4px 0" }} />
            <Users size={64} strokeWidth={1} />
            {/* SUBSTITUA PELO: <img src="/foto-rovis.jpg" alt="Rovis Nunes" style={{width:"100%",height:"100%",objectFit:"cover"}} /> */}
            <span style={{ fontSize: 12, textAlign: "center", padding: "0 20px" }}>Foto do Rovis Nunes</span>
          </div>
        </div>
      </section>

      {/* ── SOBRE ──────────────────────────────────────────────────────── */}
      <section style={{ background: C.dark3, padding: "clamp(60px,8vh,100px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}>
          <div>
            <SectionTitle
              tag="Quem está por trás da RNunes"
              title={"Um dos melhores\nconsultores de\nCuritiba"}
            />
            <p style={{ color: C.muted, lineHeight: 1.8, marginBottom: 16, fontSize: 15 }}>
              Rovis Nunes é vendedor de consórcio da Servopa reconhecido pela qualidade do atendimento e pela consistência nos resultados. Com uma das maiores carteiras ativas de clientes da cidade, construiu sua reputação ouvindo cada pessoa e entendendo o momento certo para cada decisão.
            </p>
            <p style={{ color: C.muted, lineHeight: 1.8, marginBottom: 32, fontSize: 15 }}>
              Seja para um carro, imóvel, moto ou expansão do negócio — o atendimento começa entendendo o seu objetivo real, não empurrando um produto. Essa abordagem é o que faz a diferença.
            </p>
            <WaBtn label="Falar com ele agora" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {DIFERENCIAIS.map(({ icon: Icon, titulo, desc }) => (
              <div key={titulo} style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 20, padding: 24,
                transition: "border-color .2s",
              }}
                onMouseOver={e => e.currentTarget.style.borderColor = "rgba(200,16,46,.4)"}
                onMouseOut={e => e.currentTarget.style.borderColor = C.border}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: C.redGlow, display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 14,
                }}>
                  <Icon size={20} style={{ color: C.red }} />
                </div>
                <h3 style={{ fontWeight: 800, fontSize: 14, marginBottom: 6, color: "#fff" }}>{titulo}</h3>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUE CONSÓRCIO ──────────────────────────────────────────── */}
      <section style={{ background: C.dark2, padding: "clamp(60px,8vh,100px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionTitle
            tag="Entenda a modalidade"
            title="Por que fazer consórcio?"
            sub="Uma alternativa inteligente para quem quer conquistar um bem com planejamento e sem os juros tradicionais do financiamento."
            center
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
            {[
              { n: "01", titulo: "Planejamento financeiro", desc: "Parcelas previsíveis para você organizar a compra de um bem sem surpresas no orçamento." },
              { n: "02", titulo: "Sem juros tradicionais",   desc: "Em vez de juros, você paga uma taxa de administração, tornando o custo total menor." },
              { n: "03", titulo: "Parcelas programadas",     desc: "Você conhece o valor e o prazo desde o início, facilitando o controle financeiro." },
              { n: "04", titulo: "Sorteio ou lance",         desc: "Contemplação mensal por sorteio, com possibilidade de antecipar por lance." },
              { n: "05", titulo: "Conquista com organização",desc: "Ideal para quem quer planejar a compra com calma e sem comprometer o fluxo de caixa." },
              { n: "06", titulo: "Diversos bens",            desc: "Carros, motos, imóveis, caminhões e soluções para empresas em um único produto." },
            ].map(({ n, titulo, desc }) => (
              <div key={n} style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 20, padding: 28,
                display: "flex", flexDirection: "column", gap: 12,
              }}>
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 40, color: "rgba(200,16,46,.2)", lineHeight: 1 }}>{n}</span>
                <h3 style={{ fontWeight: 800, fontSize: 15, color: "#fff" }}>{titulo}</h3>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPÇÕES DE CONSÓRCIO ────────────────────────────────────────── */}
      <section id="consorcios" style={{ background: C.dark3, padding: "clamp(60px,8vh,100px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionTitle
            tag="Portfólio"
            title="Opções de consórcio"
            sub="Escolha a modalidade que combina com o seu objetivo e entre em contato para uma apresentação personalizada."
            center
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
            {CONSORCIOS.map(({ icon: Icon, titulo, desc }) => (
              <div key={titulo} style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 20, padding: 28,
                display: "flex", flexDirection: "column", gap: 16,
                transition: "border-color .2s, transform .2s",
                cursor: "default",
              }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(200,16,46,.5)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ width: 52, height: 52, borderRadius: 14, background: C.redGlow, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={24} style={{ color: C.red }} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: 16, color: "#fff", marginBottom: 6 }}>{titulo}</h3>
                  <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{desc}</p>
                </div>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, color: C.green, fontWeight: 700, fontSize: 13, marginTop: "auto" }}
                >
                  <MessageCircle size={14} /> Tenho interesse
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTORIDADE ────────────────────────────────────────────────── */}
      <section style={{
        background: C.red, padding: "clamp(50px,7vh,80px) clamp(20px,5vw,80px)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 32, alignItems: "center" }}>
          <div style={{ gridColumn: "1 / -1" }}>
            <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: "clamp(28px,4vw,44px)", textTransform: "uppercase", letterSpacing: "-0.01em", color: "#fff", marginBottom: 6 }}>
              Por que confiar na <span style={{ fontStyle: "italic" }}>RNunes</span>?
            </h2>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 15 }}>Pilares que sustentam cada atendimento</p>
          </div>
          {[
            { icon: Award,      stat: "Top",        desc: "vendedor em Curitiba" },
            { icon: Handshake,  stat: "Consultivo", desc: "estilo de atendimento" },
            { icon: BadgeCheck, stat: "Claro",      desc: "na comunicação" },
            { icon: Shield,     stat: "Contínuo",   desc: "acompanhamento" },
          ].map(({ icon: Icon, stat, desc }) => (
            <div key={stat} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Icon size={28} style={{ color: "rgba(255,255,255,.7)" }} />
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 36, color: "#fff", lineHeight: 1 }}>{stat}</span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,.65)", fontWeight: 600 }}>{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMO FUNCIONA ─────────────────────────────────────────────── */}
      <section style={{ background: C.dark2, padding: "clamp(60px,8vh,100px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionTitle
            tag="Passo a passo"
            title="Como funciona o atendimento"
            center
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 0, justifyContent: "center", marginBottom: 48 }}>
            {PASSOS.map(({ icon: Icon, num, txt }, i) => (
              <div key={num} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, width: 160, textAlign: "center", padding: "0 8px" }}>
                  <div style={{ position: "relative" }}>
                    <div style={{ width: 64, height: 64, borderRadius: 18, background: C.card, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={26} style={{ color: C.red }} />
                    </div>
                    <span style={{
                      position: "absolute", top: -8, right: -8,
                      width: 22, height: 22, borderRadius: "50%",
                      background: C.red, color: "#fff",
                      fontFamily: "'Barlow',sans-serif", fontWeight: 800, fontSize: 10,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>{num}</span>
                  </div>
                  <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{txt}</p>
                </div>
                {i < PASSOS.length - 1 && (
                  <ChevronRight size={20} style={{ color: "rgba(255,255,255,.12)", flexShrink: 0, marginBottom: 32 }} />
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <WaBtn size="lg" />
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ───────────────────────────────────────────────── */}
      {/* ⚠️ Substitua pelos depoimentos reais antes de publicar */}
      <section style={{ background: C.dark3, padding: "clamp(60px,8vh,100px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionTitle
            tag="O que dizem os clientes"
            title="Experiências reais"
            sub="* Depoimentos fictícios — substitua pelos reais antes de publicar"
            center
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
            {DEPOIMENTOS.map(({ nome, cargo, texto }) => (
              <div key={nome} style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 20, padding: 28, display: "flex", flexDirection: "column", gap: 16,
              }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} style={{ color: "#F59E0B" }} fill="#F59E0B" />)}
                </div>
                <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.8, fontStyle: "italic" }}>"{texto}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto", borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: "50%",
                    background: C.redGlow, border: `1px solid rgba(200,16,46,.3)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: C.red, fontWeight: 800, fontSize: 15,
                  }}>{nome[0]}</div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14, color: "#fff" }}>{nome}</div>
                    <div style={{ fontSize: 12, color: C.dimmed }}>{cargo}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section style={{ background: C.dark2, padding: "clamp(60px,8vh,100px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <SectionTitle
            tag="Dúvidas frequentes"
            title="Perguntas frequentes"
            center
          />
          <FAQ />
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────── */}
      <section style={{
        background: C.dark3,
        padding: "clamp(60px,8vh,100px) clamp(20px,5vw,80px)",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "60%", height: "200%",
          background: "radial-gradient(ellipse, rgba(200,16,46,.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
          <Tag>Pronto para começar?</Tag>
          <h2 style={{
            fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900,
            fontSize: "clamp(32px,6vw,64px)", lineHeight: 1.0,
            textTransform: "uppercase", letterSpacing: "-0.02em",
            color: "#fff", marginBottom: 20,
          }}>
            QUER SABER QUAL CONSÓRCIO É IDEAL PARA VOCÊ?
          </h2>
          <p style={{ color: C.muted, fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
            Fale agora com o Rovis pelo WhatsApp. Atendimento gratuito, sem pressão e focado no que é melhor para o seu momento.
          </p>
          <WaBtn label="Chamar no WhatsApp agora" size="lg" />
        </div>
      </section>

      {/* ── RODAPÉ ────────────────────────────────────────────────────── */}
      <footer style={{
        background: "#090909", borderTop: `1px solid ${C.border}`,
        padding: "clamp(32px,5vh,56px) clamp(20px,5vw,80px)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24, marginBottom: 28 }}>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 28, letterSpacing: "-0.02em" }}>
              <span style={{ color: C.red }}>R</span>
              <span style={{ color: "#fff" }}>Nunes</span>
            </div>
            <div style={{ fontSize: 12, color: C.dimmed, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 2 }}>
              Rovis Nunes · Vendedor de Consórcio Servopa
            </div>
          </div>
          <WaBtn size="sm" />
        </div>
        <div style={{ maxWidth: 1200, margin: "0 auto", borderTop: `1px solid ${C.border}`, paddingTop: 20, fontSize: 12, color: "rgba(255,255,255,.25)", lineHeight: 1.7 }}>
          As condições podem variar conforme análise, plano escolhido e regras da administradora. A contemplação ocorre por sorteio ou lance, sem garantia de data específica. Rovis Nunes atua como consultor parceiro do Consórcio Servopa.
        </div>
      </footer>
    </>
  );
}
