// "use client";

// import { useState } from "react";
// import type { ChangeEvent, FormEvent, ReactNode } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Fraunces, Manrope } from "next/font/google";
// import axios from "axios";
// import { Leaf, Eye, EyeOff, ArrowLeft, Loader2, Activity, Fingerprint, MessageCircle, ShieldCheck } from "lucide-react";

// // Where to send the user after a successful sign in. Change to match your routes.
// const AFTER_SIGNIN_ROUTE = "/dashboard";
// const FORGOT_PASSWORD_ROUTE = "/forgot-password";

// const display = Fraunces({ subsets: ["latin"], variable: "--font-display" });
// const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

// type FormState = {
//   email: string;
//   password: string;
//   remember: boolean;
// };

// type FieldName = "email" | "password" | "form";
// type Errors = Partial<Record<FieldName, string>>;

// // TODO: replace with your real sign in call (API route, Firebase, NextAuth, etc.).
// // Throw an Error to show its message on the form, for example "Incorrect email or password."
// async function signInUser(data: FormState): Promise<void> {
//   console.log("sign in", { email: data.email, remember: data.remember });
// }

// const inputClass =
//   "w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/15";

// type FieldProps = { id: string; label: string; error?: string; aside?: ReactNode; children: ReactNode };

// function Field({ id, label, error, aside, children }: FieldProps) {
//   return (
//     <div>
//       <div className="mb-1.5 flex items-center justify-between">
//         <label htmlFor={id} className="text-sm font-semibold text-emerald-950">
//           {label}
//         </label>
//         {aside}
//       </div>
//       {children}
//       {error && (
//         <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-600">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }

// const RECAP = [
//   { icon: Fingerprint, title: "Your Prakriti", text: "Recommendations stay tuned to your constitution." },
//   { icon: Activity, title: "Your tracker", text: "Pick up your sleep, digestion and energy logs." },
//   { icon: MessageCircle, title: "Your consults", text: "Continue your AI and practitioner conversations." },
// ];

// export default function SignInPage() {
//   const router = useRouter();
//   const [form, setForm] = useState<FormState>({ email: "", password: "", remember: true });
//   const [errors, setErrors] = useState<Errors>({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const onText = (key: "email" | "password") => (e: ChangeEvent<HTMLInputElement>) =>
//     setForm((prev) => ({ ...prev, [key]: e.target.value }));

//   const validate = (): Errors => {
//     const e: Errors = {};
//     if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address.";
//     if (!form.password) e.password = "Enter your password.";
//     return e;
//   };

//   const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
//     ev.preventDefault();
//     const found = validate();
//     setErrors(found);
//     if (Object.keys(found).length > 0) return;

//     setLoading(true);
//     try {
//       await signInUser({ ...form, email: form.email.trim() });
//       router.push(AFTER_SIGNIN_ROUTE);
//     } catch (err) {
//       setErrors({ form: err instanceof Error ? err.message : "We couldn't sign you in. Check your details and try again." });
//     } finally {
//       setLoading(false);
//     }
//   };

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
//             Welcome back. Let's check in on your balance.
//           </h2>
//           <ul className="mt-8 space-y-5">
//             {RECAP.map(({ icon: Icon, title, text }) => (
//               <li key={title} className="flex gap-4">
//                 <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10">
//                   <Icon className="h-5 w-5 text-amber-400" />
//                 </span>
//                 <span>
//                   <span className="block font-semibold">{title}</span>
//                   <span className="text-sm text-emerald-100">{text}</span>
//                 </span>
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
//           <h1 className="font-[family-name:var(--font-display)] text-4xl font-medium text-emerald-950">Sign in</h1>
//           <p className="mt-2 text-slate-600">Enter your details to continue to your dashboard.</p>

//           <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
//             {errors.form && (
//               <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
//                 {errors.form}
//               </div>
//             )}

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

//             <Field
//               id="password"
//               label="Password"
//               error={errors.password}
//               aside={
//                 <Link href={FORGOT_PASSWORD_ROUTE} className="text-sm font-medium text-teal-700 underline-offset-4 hover:underline">
//                   Forgot password?
//                 </Link>
//               }
//             >
//               <div className="relative">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   autoComplete="current-password"
//                   value={form.password}
//                   onChange={onText("password")}
//                   placeholder="Your password"
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
//             </Field>

//             <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
//               <input
//                 type="checkbox"
//                 checked={form.remember}
//                 onChange={(e) => setForm((prev) => ({ ...prev, remember: e.target.checked }))}
//                 className="h-4 w-4 rounded accent-teal-600"
//               />
//               Keep me signed in on this device
//             </label>

//             <button
//               type="submit"
//               disabled={loading}
//               className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-teal-600/30 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="h-4 w-4 animate-spin" /> Signing in
//                 </>
//               ) : (
//                 "Sign in"
//               )}
//             </button>
//           </form>

//           <p className="mt-6 text-center text-sm text-slate-600">
//             New to AyurTech Pro?{" "}
//             <Link href="/signup" className="font-semibold text-teal-700 underline-offset-4 hover:underline">
//               Create an account
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