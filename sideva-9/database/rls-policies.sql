– =====================================================
– SI-DEVA9 RLS POLICIES
– =====================================================

– PRINCIPLE

– SUPER_ADMIN
–     Access All Data

– ADMIN_OPD
–     Access Own OPD Data

– PPTK
–     Access Own OPD Data

– PPK
–     Access Own OPD Data

– PBJ
–     Access Own OPD Data

– VIEWER
–     Read Only Own OPD Data

– =====================================================
– TABLES USING MULTI OPD FILTER
– =====================================================

– packages
– package_items
– price_surveys
– package_documents
– package_dpp
– package_reviews
– package_hps
– package_bahpe
– package_determinations
– procurement_officers
– ppkoms
– audit_logs

– =====================================================
– FILTER
– =====================================================

– tenant_id
– opd_id

– =====================================================
– SECURITY RULE
– =====================================================

– SUPER_ADMIN
–     bypass OPD filter

– NON SUPER_ADMIN
–     only records where:

–     row.opd_id
–     =
–     current_user.opd_id

– =====================================================
– IMPORTANT
– =====================================================

– Never rely on frontend filtering only.

– RLS must remain active.

– tenant_id and opd_id are mandatory
– on procurement tables.
