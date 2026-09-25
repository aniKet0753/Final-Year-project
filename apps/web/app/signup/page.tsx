// "use client";

// import { useState } from "react";
// import type { ChangeEvent, FormEvent, ReactNode } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { Fraunces, Manrope } from "next/font/google";
// import { Leaf, Eye, EyeOff, ArrowLeft, Loader2, Check, ShieldCheck } from "lucide-react";

// // Where to send the user after a successful sign up. Change to match your routes.
// const AFTER_SIGNUP_ROUTE = "/signin";

// const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });
// const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

// type FormState = {
//   name: string;
//   email: string;
//   password: string;
//   goal: string;
//   terms: boolean;
// };

// type FieldName = "name" | "email" | "password" | "terms" | "form";
// type Errors = Partial<Record<FieldName, string>>;

// const GOALS = ["Digestion", "Sleep", "Stress", "Skin and hair", "General wellness"];

// const STRENGTH = [
//   { label: "Too short", bar: "bg-red-500" },
//   { label: "Weak", bar: "bg-red-500" },
//   { label: "Fair", bar: "bg-amber-500" },
//   { label: "Good", bar: "bg-teal-500" },
//   { label: "Strong", bar: "bg-emerald-500" },
// ];

// function passwordScore(p: string): number {
//   if (p.length < 8) return 0;
//   const checks = [/[a-z]/.test(p) && /[A-Z]/.test(p), /\d/.test(p), /[^A-Za-z0-9]/.test(p)];
//   return 1 + checks.filter(Boolean).length;
// }

// // TODO: replace with your real sign up call (API route, Firebase, NextAuth, etc.).
// // Throw an Error to show its message on the form.
// async function createAccount(data: Omit<FormState, "terms">): Promise<void> {
//   console.log("sign up", data);
// }

// const inputClass =
//   "w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/15";

// type FieldProps = { id: string; label: string; error?: string; children: ReactNode };

// function Field({ id, label, error, children }: FieldProps) {
//   return (
//     <div>
//       <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-emerald-950">
//         {label}
//       </label>
//       {children}
//       {error && (
//         <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-600">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }

// export default function SignUpPage() {
//   const router = useRouter();
//   const [form, setForm] = useState<FormState>({ name: "", email: "", password: "", goal: "", terms: false });
//   const [errors, setErrors] = useState<Errors>({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const strength = passwordScore(form.password);


//   const onText = (key: "name" | "email" | "password") => (e: ChangeEvent<HTMLInputElement>) =>
//     setForm((prev) => ({ ...prev, [key]: e.target.value }));

//   const validate = (): Errors => {
//     const e: Errors = {};
//     if (!form.name.trim()) e.name = "Enter your full name.";
//     if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
//     if (form.password.length < 8) e.password = "Use at least 8 characters.";
//     if (!form.terms) e.terms = "Accept the terms to continue.";
//     return e;
//   };

//   const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
//     ev.preventDefault();
//     const found = validate();
//     setErrors(found);
//     if (Object.keys(found).length > 0) return;

//     setLoading(true);
//     try {
//       signupfunc();
      
//       router.push(AFTER_SIGNUP_ROUTE);
//     } catch (err) {
//       setErrors({ form: err instanceof Error ? err.message : "We couldn't create your account. Try again." });
//     } finally {
//       setLoading(false);
//     }
//   };


//   const signupfunc = async ()=>{
//     try{
//     const responce = await axios.post(`http://localhost:8080/signup`,{
//       fullName:form.name,
//       email:form.email,
//       password:form.password,
//     });
    
//     console.log("signup details: ", responce);
//     alert("Signup successful!");
//   }catch(error){
//     console.error(error);
//   }
// }
//   const border = (key: FieldName) => (errors[key] ? "border-red-500" : "border-emerald-950/15");

//   return (
//     <div
//       className={`${display.variable} ${body.variable} grid min-h-screen bg-white font-[family-name:var(--font-body)] text-slate-900 antialiased lg:grid-cols-[0.9fr_1.1fr]`}
//     >
//       {/* Brand panel */}
//       <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-950 to-teal-800 p-12 text-white lg:flex">
//         <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />
//         <div aria-hidden className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-teal-500/40 blur-3xl" />

//         <Link href="/" className="relative flex items-center gap-2.5 self-start">
//           <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15">
//             <Leaf className="h-5 w-5" />
//           </span>
//           <span className="font-[family-name:var(--font-display)] text-xl font-semibold">AyurTech Pro</span>
//         </Link>

//         <div className="relative">
//           <h2 className="font-[family-name:var(--font-display)] text-4xl font-medium leading-tight xl:text-5xl">
//             Begin with your own constitution.
//           </h2>
//           <ul className="mt-8 space-y-4 text-emerald-100">
//             {[
//               "Find your dosha with the Prakriti test",
//               "Get herb and routine suggestions matched to you",
//               "Track how your balance changes week by week",
//             ].map((t) => (
//               <li key={t} className="flex gap-3">
//                 <Check className="mt-1 h-5 w-5 shrink-0 text-amber-400" />
//                 {t}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <p className="relative font-[family-name:var(--font-display)] text-lg italic text-emerald-200">
//           Ashwagandha, Tulsi, Triphala, Brahmi, Amalaki
//         </p>
//       </aside>

//       {/* Form */}
//       <main className="flex flex-col px-5 py-8 sm:px-10">
//         <Link href="/" className="flex items-center gap-2 self-start text-sm font-medium text-slate-600 hover:text-emerald-950">
//           <ArrowLeft className="h-4 w-4" /> Back to home
//         </Link>

//         <div className="m-auto w-full max-w-md py-10">
//           <h1 className="font-[family-name:var(--font-display)] text-4xl font-medium text-emerald-950">Create your account</h1>
//           <p className="mt-2 text-slate-600">It takes a minute. Your first analysis is free.</p>

//           <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
//             {errors.form && (
//               <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
//                 {errors.form}
//               </div>
//             )}

//             <Field id="name" label="Full name" error={errors.name}>
//               <input
//                 id="name"
//                 autoComplete="name"
//                 value={form.name}
//                 onChange={onText("name")}
//                 placeholder="Asha Sharma"
//                 aria-invalid={!!errors.name}
//                 aria-describedby={errors.name ? "name-error" : undefined}
//                 className={`${inputClass} ${border("name")}`}
//               />
//             </Field>

//             <Field id="email" label="Email" error={errors.email}>
//               <input
//                 id="email"
//                 type="email"
//                 autoComplete="email"
//                 value={form.email}
//                 onChange={onText("email")}
//                 placeholder="you@example.com"
//                 aria-invalid={!!errors.email}
//                 aria-describedby={errors.email ? "email-error" : undefined}
//                 className={`${inputClass} ${border("email")}`}
//               />
//             </Field>

//             <Field id="password" label="Password" error={errors.password}>
//               <div className="relative">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   autoComplete="new-password"
//                   value={form.password}
//                   onChange={onText("password")}
//                   placeholder="At least 8 characters"
//                   aria-invalid={!!errors.password}
//                   aria-describedby={errors.password ? "password-error" : undefined}
//                   className={`${inputClass} ${border("password")} pr-12`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((v) => !v)}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:text-emerald-950"
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//               {form.password && (
//                 <div className="mt-2.5 flex items-center gap-3" aria-live="polite">
//                   <div className="flex flex-1 gap-1.5">
//                     {[1, 2, 3, 4].map((i) => (
//                       <span
//                         key={i}
//                         className={`h-1.5 flex-1 rounded-full transition-colors ${i <= strength ? STRENGTH[strength].bar : "bg-slate-200"}`}
//                       />
//                     ))}
//                   </div>
//                   <span className="w-16 text-right text-xs font-medium text-slate-500">{STRENGTH[strength].label}</span>
//                 </div>
//               )}
//             </Field>

//             <fieldset>
//               <legend className="mb-2 text-sm font-semibold text-emerald-950">
//                 What brings you here? <span className="font-normal text-slate-500">(optional)</span>
//               </legend>
//               <div className="flex flex-wrap gap-2">
//                 {GOALS.map((g) => {
//                   const on = form.goal === g;
//                   return (
//                     <button
//                       key={g}
//                       type="button"
//                       aria-pressed={on}
//                       onClick={() => setForm((prev) => ({ ...prev, goal: on ? "" : g }))}
//                       className={`rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 ${
//                         on ? "bg-emerald-950 text-white" : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
//                       }`}
//                     >
//                       {g}
//                     </button>
//                   );
//                 })}
//               </div>
//             </fieldset>

//             <div>
//               <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-600">
//                 <input
//                   type="checkbox"
//                   checked={form.terms}
//                   onChange={(e) => setForm((prev) => ({ ...prev, terms: e.target.checked }))}
//                   className="mt-0.5 h-4 w-4 rounded accent-teal-600"
//                 />
//                 <span>
//                   I understand AyurTech Pro gives educational guidance and does not replace medical advice, and I accept
//                   the terms and privacy policy.
//                 </span>
//               </label>
//               {errors.terms && (
//                 <p role="alert" className="mt-1.5 text-sm text-red-600">
//                   {errors.terms}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//              onClick={signupfunc}
//               className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-teal-600/30 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="h-4 w-4 animate-spin" /> Creating account
//                 </>
//               ) : (
//                 "Create account"
//               )}
//             </button>
//           </form>

//           <p className="mt-6 text-center text-sm text-slate-600">
//             Already have an account?{" "}
//             <Link href="/signin" className="font-semibold text-teal-700 underline-offset-4 hover:underline">
//               Sign in
//             </Link>
//           </p>
//           <p className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
//             <ShieldCheck className="h-4 w-4" /> Your health details stay private to your account.
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// }