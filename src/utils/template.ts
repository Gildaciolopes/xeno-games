export interface TemplateVars {
  user: string;
  guild: string;
  memberCount: number;
}

export function render(template: string, vars: TemplateVars): string {
  return template
    .replace(/\{\{user\}\}/g, vars.user)
    .replace(/\{\{guild\}\}/g, vars.guild)
    .replace(/\{\{memberCount\}\}/g, String(vars.memberCount))
    .replace(/\\n/g, '\n');
}
