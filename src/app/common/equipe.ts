export class Equipe {
    id: number;
    name: string;
    department: string;
    equipe_leader: string;
    equipe_leader_backup: string;
  
    constructor(
      id?: number,
      name?: string,
      department?: string,
      equipe_leader?: string,
      equipe_leader_backup?: string
    ) {
      this.id = id || 0;
      this.name = name || '';
      this.department = department || '';
      this.equipe_leader = equipe_leader || '';
      this.equipe_leader_backup = equipe_leader_backup || '';
    }
  }
  