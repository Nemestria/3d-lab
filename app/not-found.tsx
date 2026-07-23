// 404 — a route that doesn't exist. Reuses the shared lab placeholder with
// "specimen not found" copy.
import LabPlaceholder from '@/components/ui/LabPlaceholder'

export default function NotFound() {
  return (
    <LabPlaceholder
      status="specimen not found"
      message="This experiment is still being crafted on the workbench — or it never existed. Either way, there's nothing to see here yet."
      code="404"
    />
  )
}
