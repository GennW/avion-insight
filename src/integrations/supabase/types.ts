export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      aircraft: {
        Row: {
          authenticity: number | null
          components: number | null
          created_at: string | null
          id: number
          last_check: string | null
          operator: string
          status: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          authenticity?: number | null
          components?: number | null
          created_at?: string | null
          id: number
          last_check?: string | null
          operator: string
          status?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          authenticity?: number | null
          components?: number | null
          created_at?: string | null
          id?: number
          last_check?: string | null
          operator?: string
          status?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      components: {
        Row: {
          aircraft_id: number | null
          created_at: string | null
          id: number
          last_check: string | null
          name: string
          passport_duplicate: boolean | null
          resource_expired: boolean | null
          serial_number: string | null
          status: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          aircraft_id?: number | null
          created_at?: string | null
          id?: number
          last_check?: string | null
          name: string
          passport_duplicate?: boolean | null
          resource_expired?: boolean | null
          serial_number?: string | null
          status?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          aircraft_id?: number | null
          created_at?: string | null
          id?: number
          last_check?: string | null
          name?: string
          passport_duplicate?: boolean | null
          resource_expired?: boolean | null
          serial_number?: string | null
          status?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "components_aircraft_id_fkey"
            columns: ["aircraft_id"]
            isOneToOne: false
            referencedRelation: "aircraft"
            referencedColumns: ["id"]
          },
        ]
      }
      monitoring_results: {
        Row: {
          color: string | null
          created_at: string | null
          criterion: string
          description: string | null
          id: number
          updated_at: string | null
          value: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          criterion: string
          description?: string | null
          id?: number
          updated_at?: string | null
          value?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          criterion?: string
          description?: string | null
          id?: number
          updated_at?: string | null
          value?: number | null
        }
        Relationships: []
      }
      operators: {
        Row: {
          compliant: number | null
          count: number | null
          created_at: string | null
          id: number
          name: string
          region: string
          updated_at: string | null
        }
        Insert: {
          compliant?: number | null
          count?: number | null
          created_at?: string | null
          id?: number
          name: string
          region: string
          updated_at?: string | null
        }
        Update: {
          compliant?: number | null
          count?: number | null
          created_at?: string | null
          id?: number
          name?: string
          region?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ros_inf_25: {
        Row: {
          bn: string | null
          ca: string | null
          comment: string | null
          csd: string | null
          dat_pasp_dubl: string | null
          dateap: string
          dateup: string | null
          db: string | null
          dn: string | null
          dp: string | null
          dr: string | null
          drne: string | null
          dt_ito: string | null
          dv: string
          dvne: string | null
          folder_n: string | null
          gn: string
          gn_orig: string | null
          hostname: string | null
          ka: string | null
          kol_rem: number | null
          ks: string | null
          master: string | null
          me: string | null
          mn: string | null
          n1_pto: number | null
          n2_pto: number | null
          ne1: number | null
          ne1_to: number | null
          ne2: number | null
          ne2_to: number | null
          ne3: number | null
          ne4: number | null
          nk: number | null
          nr1: number | null
          nr2: number | null
          nr3: number | null
          nr4: number | null
          pe_ito: number | null
          pk_ito: number | null
          postav: string | null
          pp_ito: number | null
          pr_pasp: string | null
          rem_zavod: string | null
          rm1: number | null
          rm2: number | null
          rm3: number | null
          rm4: number | null
          rn1: number | null
          rn2: number | null
          rn3: number | null
          rn4: number | null
          source: string | null
          ss: number | null
          tl: string | null
          username: string | null
          who_pasp_dubl: string | null
          zav_izgot: string | null
          zn: string
        }
        Insert: {
          bn?: string | null
          ca?: string | null
          comment?: string | null
          csd?: string | null
          dat_pasp_dubl?: string | null
          dateap: string
          dateup?: string | null
          db?: string | null
          dn?: string | null
          dp?: string | null
          dr?: string | null
          drne?: string | null
          dt_ito?: string | null
          dv: string
          dvne?: string | null
          folder_n?: string | null
          gn: string
          gn_orig?: string | null
          hostname?: string | null
          ka?: string | null
          kol_rem?: number | null
          ks?: string | null
          master?: string | null
          me?: string | null
          mn?: string | null
          n1_pto?: number | null
          n2_pto?: number | null
          ne1?: number | null
          ne1_to?: number | null
          ne2?: number | null
          ne2_to?: number | null
          ne3?: number | null
          ne4?: number | null
          nk?: number | null
          nr1?: number | null
          nr2?: number | null
          nr3?: number | null
          nr4?: number | null
          pe_ito?: number | null
          pk_ito?: number | null
          postav?: string | null
          pp_ito?: number | null
          pr_pasp?: string | null
          rem_zavod?: string | null
          rm1?: number | null
          rm2?: number | null
          rm3?: number | null
          rm4?: number | null
          rn1?: number | null
          rn2?: number | null
          rn3?: number | null
          rn4?: number | null
          source?: string | null
          ss?: number | null
          tl?: string | null
          username?: string | null
          who_pasp_dubl?: string | null
          zav_izgot?: string | null
          zn: string
        }
        Update: {
          bn?: string | null
          ca?: string | null
          comment?: string | null
          csd?: string | null
          dat_pasp_dubl?: string | null
          dateap?: string
          dateup?: string | null
          db?: string | null
          dn?: string | null
          dp?: string | null
          dr?: string | null
          drne?: string | null
          dt_ito?: string | null
          dv?: string
          dvne?: string | null
          folder_n?: string | null
          gn?: string
          gn_orig?: string | null
          hostname?: string | null
          ka?: string | null
          kol_rem?: number | null
          ks?: string | null
          master?: string | null
          me?: string | null
          mn?: string | null
          n1_pto?: number | null
          n2_pto?: number | null
          ne1?: number | null
          ne1_to?: number | null
          ne2?: number | null
          ne2_to?: number | null
          ne3?: number | null
          ne4?: number | null
          nk?: number | null
          nr1?: number | null
          nr2?: number | null
          nr3?: number | null
          nr4?: number | null
          pe_ito?: number | null
          pk_ito?: number | null
          postav?: string | null
          pp_ito?: number | null
          pr_pasp?: string | null
          rem_zavod?: string | null
          rm1?: number | null
          rm2?: number | null
          rm3?: number | null
          rm4?: number | null
          rn1?: number | null
          rn2?: number | null
          rn3?: number | null
          rn4?: number | null
          source?: string | null
          ss?: number | null
          tl?: string | null
          username?: string | null
          who_pasp_dubl?: string | null
          zav_izgot?: string | null
          zn?: string
        }
        Relationships: []
      }
      ros_of_stat: {
        Row: {
          ca: string | null
          cn: string | null
          comment: string | null
          date_in: string | null
          date_rep: string | null
          date_wr: string | null
          expert: string | null
          file_ext: string | null
          fn: string | null
          id: number
          pr_take: number | null
          reason: number | null
          upload: string | null
        }
        Insert: {
          ca?: string | null
          cn?: string | null
          comment?: string | null
          date_in?: string | null
          date_rep?: string | null
          date_wr?: string | null
          expert?: string | null
          file_ext?: string | null
          fn?: string | null
          id?: number
          pr_take?: number | null
          reason?: number | null
          upload?: string | null
        }
        Update: {
          ca?: string | null
          cn?: string | null
          comment?: string | null
          date_in?: string | null
          date_rep?: string | null
          date_wr?: string | null
          expert?: string | null
          file_ext?: string | null
          fn?: string | null
          id?: number
          pr_take?: number | null
          reason?: number | null
          upload?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
