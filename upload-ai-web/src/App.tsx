import {Github, Wand2, PlayCircle} from 'lucide-react'
import { Button } from "./components/ui/button"
import { Separator } from './components/ui/separator'
import { Textarea } from './components/ui/textarea'
import { Label } from './components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select'
import { Slider } from './components/ui/slider'
import { VideoInputForm } from './components/video-input-form'


export function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className="px-6 py-3 flex items-center justify-between border-b">

        <div className='flex items-center gap-3'>
          <PlayCircle className='w-4 h-4 mr-2'/>

          <Separator orientation='vertical' className='h-6'/>
          
          <h1 className="text-xl font-bold">upload.ai</h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Torne suas decisões mais inteligentes 🚀</span>

          <Separator orientation='vertical' className='h-6'/>

          <Button>
            <Github className='w-4 h-4 mr-2'/>
            GitHub
          </Button>
        </div>
      </div>

      <main className='flex-1 p-4 flex gap-6'>
        <div className='flex flex-col flex-1 gap-4'>
          <div className='grid grid-rows-2 gap-4 flex-1'>
            <Textarea 
              className='resize-none p-4 leading-relaxed'
              placeholder='Inclua o prompt para a IA...'
            />
            <Textarea 
              className='resize-none p-4 leading-relaxed'
              placeholder='Resultado gerado pela IA.' 
              readOnly/>
          </div>

          <p className='text-sm text-muted-foreground'>Lembre-se: você pode utilizar a variável <code className='text-blue-500'>{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.</p>
        </div>

        <aside className='w-80 space-y-4'>
          <VideoInputForm />

          <Separator />

          <form className='space-y-6'>
            <div className='space-y-2'>
              <Label>Prompt</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Selecione um prompt...'/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='tittle'>Título do YouTube</SelectItem>
                  <SelectItem value='description'>Descrição do YouTube</SelectItem>
                </SelectContent>
              </Select>
              <span className='block text-muted-foreground text-xs italic'>
                Você poderá customizar essa opção em breve
              </span>
            </div>

            <div className='space-y-2'>
              <Label>Modelo</Label>
              <Select disabled defaultValue='gpt3.5'>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='gpt3.5'>GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className='block text-muted-foreground text-xs italic'>
                Você poderá customizar essa opção em breve
              </span>
            </div>

            <Separator />

            <div className='space-y-4'>
              <Label>Temperatura</Label>
              <Slider 
                min={0}
                max={1}
                step={0.01}
              />
              <span className='block text-muted-foreground text-xs italic leading-relaxed'>
                Valores mais altos tendem a deixar o resultado mais criativo, mas menos preciso.
              </span>
            </div>

            <Separator />

            <Button className='w-full' type='submit'>
              Executar
              <Wand2 className='h-4 w-4 ml-2'/>
            </Button>

          </form>
        </aside>
      </main>
    </div>
  )
}
